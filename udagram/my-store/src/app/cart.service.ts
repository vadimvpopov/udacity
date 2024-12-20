import { Injectable } from '@angular/core';
import { Cart } from './models/cart';
import { OrderItem } from './models/order_item';
import { ConfirmationDetails } from './models/confirmation_details';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { concatMap, concatWith } from 'rxjs/operators'
import { from, Observable } from 'rxjs';
import { environment } from '../environments/environment';

const API_HOST = environment.apiHost;

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart = new Cart();
  confirmationDetails: ConfirmationDetails = new ConfirmationDetails();
  constructor(private http: HttpClient, private authService: AuthService) { }
  
  addOrderItem(orderItem: OrderItem): void {
    this.cart.addToCart(orderItem);
  }

  confirmOrder(): Observable<any> {
    const userId:number = this.authService.userId;
    const headers = { 'Authorization': `Bearer ${this.authService.token}` };
    const orderItemUrl = `http://${API_HOST}/api/orders/order/items`;
    const orderItems$ = from(this.cart.orderItems).pipe( 
      concatMap(orderItem => {
        const payload = {userId: userId, productId: orderItem.product.id, quantity: orderItem.quantity};
        return this.http.post(orderItemUrl, payload, {headers});
      })
    );
    
    const finalRequest$ = this.http.put(`http://${API_HOST}/api/orders/order/close`, {userId}, {headers}); 

    this.confirmationDetails.fullName = this.cart.fullName;
    this.confirmationDetails.totalAmount = this.cart.total;
    this.cart.orderItems = [];
    this.cart.total = 0;
    this.cart.creditCardNumber = "";

    return orderItems$.pipe( concatWith(finalRequest$) );
  }
}

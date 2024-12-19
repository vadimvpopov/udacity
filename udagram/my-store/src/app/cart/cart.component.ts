import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart';
import { CartService } from '../cart.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderItem } from '../models/order_item';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

    cart!: Cart;
    constructor(private cartService: CartService,
                private router:Router)
    {}
    
    ngOnInit() {
      this.cart = this.cartService.cart;
    }

    onSubmit(): void {
      console.log('cart: ');
      console.log(this.cart);
      this.cartService.confirmOrder().subscribe({ 
        error: (err) => { 
          console.error('Request failed:', err); 
          this.router.navigate(['confirmation/'], { queryParams: { error: err.message }});
        }, 
        complete: () => { 
          console.log('Order sent successfully.'); 
          this.router.navigate(['confirmation/']);
        } 
          
      });
      
    }

    onValueChange($event: Event, orderItem: OrderItem) {
      console.log('changing orderItem:', orderItem);
      if (orderItem.quantity === 0 || orderItem.quantity === null) {
        alert(`Product ${orderItem.product.name} removed from cart!`);
      }
      this.cart.updateTotal();
    }
}

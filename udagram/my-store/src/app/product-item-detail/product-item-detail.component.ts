import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../models/product';
import { ProductsService } from '../products.service';
import { FormsModule } from '@angular/forms';
import { OrderItem } from '../models/order_item';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-item-detail',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './product-item-detail.component.html',
  styleUrl: './product-item-detail.component.css'
})
export class ProductItemDetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  productsService:ProductsService = inject(ProductsService);
  cartService:CartService = inject(CartService);
  product: Product;
  quantity: number = 1;


  constructor() {
    const productId = Number(this.route.snapshot.params['id']);
    this.product = this.productsService.getProductById(productId) || new Product();
  }

  onAddToCart(): void {
    const orderItem: OrderItem = { product: this.product, quantity: this.quantity};
    console.log("Adding orderItem" + orderItem);
    alert(`Adding product to cart: ${this.quantity} ${this.product.name}(s) `);
    this.cartService.addOrderItem(orderItem);
  }

}

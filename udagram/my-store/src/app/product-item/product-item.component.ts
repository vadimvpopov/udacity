import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/product';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { OrderItem } from '../models/order_item';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product: Product = new Product();
  @Output() addToCart = new EventEmitter();
  quantity: number = 1;

  constructor() {}

  ngOnInit(): void {
  }

  onAddToCart(): void {
    const productItem: OrderItem = { product: this.product, quantity: this.quantity};
    console.log("Adding orderItem" + productItem);
    this.addToCart.emit(productItem);
  }
}

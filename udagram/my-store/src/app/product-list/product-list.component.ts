import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { NgFor, NgIf } from '@angular/common';
import { ProductItemComponent } from "../product-item/product-item.component";
import { CartService } from '../cart.service';
import { OrderItem } from '../models/order_item';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, NgIf, ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productsService: ProductsService,
              private cartService: CartService
  ) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe(data => {
      this.products = data;
      console.log(data);
    });
  }

  onAddToCart(orderItem:OrderItem): void {
    this.cartService.addOrderItem(orderItem);
    alert(`Adding product to cart: ${orderItem.quantity} ${orderItem.product.name} `);
  }

}

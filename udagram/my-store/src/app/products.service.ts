import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from './models/product';
import { environment } from '../environments/environment.prod';

const API_HOST = environment.apiHost;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products!: Product[];
  constructor(private http: HttpClient) 
  {}

  getProducts(): Observable<Product[]>  {
    //return this.http.get<Product[]>("/assets/data.json");
    return this.http.get<Product[]>(`http://${API_HOST}/api/products`).pipe(
      map(products => this.products = products)
    );
  }

  getProductById(id: Number): Product| undefined {
    console.log(`searching for ${id}`);
    console.log(`products ${this.products}`);
    return this.products.find(product => product.id === id);
  } 

}

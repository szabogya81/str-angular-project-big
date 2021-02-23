import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../model/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' }
    )
  }

  productsUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {
  }

  getAll(
    key: string = 'name', filterStr: string = '', 
    page: number = 0, limit: number = 50): Observable<Product[]> {

    let url: string = this.productsUrl;

    if (filterStr) {
      if (['name', 'type', 'description'].includes(key)) {
        url = `${url}?${key}_like=${filterStr}`;
      }
      else if (['id', 'catId', 'price', 'featured', 'active'].includes(key)) {
        url = `${url}?${key}=${filterStr}`;
      }

      url +='&';
    }
    else {
      url +='?';
    }
    url += `_page=${page}&_limit=${limit}`;

    return this.http.get<Product[]>(url);
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`
      ${this.productsUrl}/${product.id}`, product, this.httpOptions);
  }

  remove(product: Product | number): Observable<Product> {
    let id = typeof(product) === 'number' ? product : product.id;
    
    return this.http.delete<Product>(`${this.productsUrl}/${id}`, this.httpOptions);
  }
}

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

  getAll(key: string = 'name', filterStr: string = ''): Observable<Product[]> {
    let url: string = this.productsUrl;

    if (filterStr) {
      if (['name', 'type', 'description'].includes(key)) {
        url = `${url}?${key}_like=${filterStr}`;
      }
      else if (['id', 'catId', 'price', 'featured', 'active'].includes(key)) {
        url = `${url}?${key}=${filterStr}`;
      }
    }

    return this.http.get<Product[]>(url);
  }
}

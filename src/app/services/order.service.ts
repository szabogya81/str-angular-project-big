import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer';
import { Order } from '../model/order';
import { Product } from '../model/product';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderUrl: string = 'http://localhost:3000/orders';
  customersUrl = ConfigService.customersUrl;
  productsUrl = ConfigService.productsUrl;


  constructor(private http: HttpClient) { }


    getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.orderUrl);
  }

  get(id: number): Observable<Order> {
    id = typeof id === 'string' ? parseInt(id, 10) : id;
    if (id !== 0) {
      return this.http.get<Order>(`${this.orderUrl}/${id}`);
    }
    return of(new Order());
  }

  getCustomerIdById(customerID: number): Observable<Customer> {
    if (customerID > 0) {
      return this.http.get<Customer>(`${this.customersUrl}/${customerID}`);
    } else {
      return of(new Customer());
    }
  }

  getProductIdById(productID: number): Observable<Product> {
    if (productID > 0) {
      return this.http.get<Product>(`${this.productsUrl}/${productID}`);
    } else {
      return of(new Product());
    }
  }

  create(order: Order): Observable<any> {
    return this.http.post<Observable<any>>(`${this.orderUrl}`, order);
  }

  update(order: Order): Observable<any> {
    return this.http.patch<any>(`${this.orderUrl}/${order.id}`, order);
  }

  remove(order: any): Observable<any> {
    order = order.id ? order.id : order;
    return this.http.delete<Order>( `${this.orderUrl}/${order}` );
  }

  likeProduct(key: string, value: string, limit: number = 10): Observable<Product[]> {
    key = `${key}_like`;
    value = value.replace(/[\d#-]+/g, '').trim();
    const query = `${this.productsUrl}?${key}=${value}&_limit=${limit}`;
    return this.http.get<Product[]>(query);
  }

  likeCustomer(key: string, value: string, limit: number = 10): Observable<Customer[]> {
    key = `${key}_like`;
    value = value.replace(/[\d#-]+/g, '').trim();
    const query = `${this.customersUrl}?${key}=${value}&_limit=${limit}`;
    return this.http.get<Customer[]>(query);
  }

}

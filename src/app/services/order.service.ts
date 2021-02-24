import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderUrl: string = 'http://localhost:3000/orders';


  constructor(private http: HttpClient) { }


    getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.orderUrl);
  }

  get(id: number): Observable<Order> {
    if (id) {
      return this.http.get<Order>(`${this.orderUrl}/${id}`);
    }
    return of(new Order());
  }

  create(order: Order): Observable<any> {
    return this.http.post<Observable<any>>(`${this.orderUrl}`, order);
  }

  update(order: Order): Observable<any> {
    return this.http.put<any>(`${this.orderUrl}/${order.id}`, order);
  }

  remove(order: any): Observable<any> {
    order = order.id ? order.id : order;
    return this.http.delete( `${this.orderUrl}/${order}` );
  }

}

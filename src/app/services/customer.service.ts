import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  httpURL: string = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.httpURL);
  }

  get(id: number): Observable<Customer> {
    id = typeof id === 'string' ? parseInt(id, 10) : id;
    if (id !== 0) {
      return this.http.get<Customer>(`${this.httpURL}/${id}`);
    }
    return of(new Customer());
  }

  update(customer: Customer): Observable<any> {
    return this.http.put<any>(`${this.httpURL}/${customer.id}`, customer);
  }

  create(customer: Customer): Observable<any> {
    return this.http.post<Observable<any>>(`${this.httpURL}`, customer);
  }

  remove(customer: Customer | number): Observable<Customer> {
    let id: Number = typeof (customer) === 'number' ? customer : customer.id;
    return this.http.delete<Customer>(`${this.httpURL}/${id}`);
  }

}

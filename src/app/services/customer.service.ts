import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customersUrl = ConfigService.customersUrl;
  httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' }
    )
  }

  constructor(private http: HttpClient) { }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl);
  }

  get(id: number): Observable<Customer> {
    id = typeof id === 'string' ? parseInt(id, 10) : id;
    if (id !== 0) {
      return this.http.get<Customer>(`${this.customersUrl}/${id}`);
    }
    return of(new Customer());
  }

  update(customer: Customer): Observable<any> {
    return this.http.put<any>(`${this.customersUrl}/${customer.id}`, customer);
  }

  create(customer: Customer): Observable<any> {
    return this.http.post<Observable<any>>(`${this.customersUrl}`, customer);
  }

  remove(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${this.customersUrl}/${id}`, this.httpOptions);
  }

}

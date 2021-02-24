import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Bill } from '../model/bill';


@Injectable({
  providedIn: 'root'
})
export class BillService {


  httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' }
    )
  }

  billsUrl = 'http://localhost:3000/bills';



  constructor(private http: HttpClient) {
  }

  getAll(
    key: string = 'orderID', filterStr: string = '', 
    page: number = 0, limit: number = 50): Observable<Bill[]> {

    let url: string = this.billsUrl;

    if (filterStr) {
      if (['orderID', 'status'].includes(key)) {
        url = `${url}?${key}=${filterStr}`;
      }

      url +='&';
    }
    else {
      url +='?';
    }
    url += `_page=${page}&_limit=${limit}`;

    return this.http.get<Bill[]>(url);
  }

  get(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.billsUrl}/${id}`);
  }

  create(bill: Bill): Observable<any> {
    return this.http.post<Observable<any>>(`${this.billsUrl}`, bill);
  }

  update(bill: Bill): Observable<any> {
    return this.http.put<any>(`${this.billsUrl}/${bill.id}`, bill);
  }

  remove(bill: any): Observable<any> {
    bill = bill.id ? bill.id : bill;
    return this.http.delete( `${this.billsUrl}/${bill}` );
  }
}

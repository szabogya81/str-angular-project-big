import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Bill } from '../model/bill';
import { IdProvider } from '../model/id-generator/id-provider';


@Injectable({
  providedIn: 'root'
})
export class BillService implements IdProvider {


  billsUrl = 'http://localhost:3000/bills';



  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.billsUrl);
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

  // remove(bill: any): Observable<any> {
  //   bill = bill.id ? bill.id : bill;
  //   return this.http.delete( `${this.billsUrl}/${bill}` );
  // }
}

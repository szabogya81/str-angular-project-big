import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Bill } from '../model/bill';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' }
    )
  }
  constructor(private http: HttpClient) { }

  getCount(type: string, filterPart: string = ''): Observable<number> {
    let url = this.getUrlByType(type);
    let paging = '_page=1&_limit=1';
    let filteredCount = this.getCountQuery(`${url}${filterPart}&${paging}`);
    return filteredCount;
  }

  getCounts(type: string, filterPart: string = ''): Observable<[number, number]> {
    let url = this.getUrlByType(type);
    let filter = filterPart ? `?${filterPart}` : '?active=true&';
    let paging = '_page=1&_limit=1';
    let count = this.getCountQuery(`${url}?${paging}`);
    let filteredCount = this.getCountQuery(`${url}${filter}&${paging}`);
    return forkJoin([count, filteredCount]);
  }

  getBillSumOfValues(): Observable<[number, number]> {
    let url = this.getUrlByType('bill');
    let filter = '?status_ne=paid';
    let totalValue = this.http.get<Bill[]>(url, this.httpOptions).pipe(
      map(bills => bills.map(bill => bill.amount).reduce((acc, curr) => acc + curr)));
    let unpaidValue = this.http.get<Bill[]>(`${url}${filter}`, this.httpOptions).pipe(
      map(bills => bills.map(bill => bill.amount).reduce((acc, curr) => acc + curr)));
    return forkJoin([totalValue, unpaidValue]);
  }

  getUrlByType(type: string): string {
    let url = '';

    switch(type.toLocaleLowerCase()) {
      case 'bill': 
        url += ConfigService.billsUrl;
        break;
      case 'customer': 
        url += ConfigService.customersUrl;
        break;
      case 'order': 
        url += ConfigService.ordersUrl;
        break;
      case 'product': 
        url += ConfigService.productsUrl;
        break;
      default:
        url = ConfigService.baseUrl;
    }
    return url;
  }

  getCountQuery(url: string) {
    let countHeaderKey: string = 'X-Total-Count';
    return this.http.get(url, { headers: this.httpOptions.headers,  observe: 'response' })
      .pipe(map(resp =>  parseInt(
        resp.headers.get(countHeaderKey) || '0', 10)));
  }
}

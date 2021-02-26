import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Category } from '../model/category';
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
  categoriesUrl = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {
  }

  //#region Main methods
  get(
    key: string = 'name', filterStr: string = '',
    page: number = 0, limit: number = 50,
    sortKey: string = '', isDesc: boolean = false): Observable<Product[]> {

    let url: string = this.getFilterUrl(key, filterStr);
    url = this.appendSortParams(url, sortKey, isDesc);
    url = this.appendPaging(url, page, limit);

    return this.http.get<Product[]>(url);
  }

  getById(productId: number): Observable<Product> {
    let url: string = `${this.productsUrl}/${productId}`;
    return this.http.get<Product>(url, this.httpOptions);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl, this.httpOptions);
  }

  create(product: Product): Observable<Product> {
    product.id = 0;

    return this.http.post<Product>(`
      ${this.productsUrl}`, product, this.httpOptions);
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`
      ${this.productsUrl}/${product.id}`, product, this.httpOptions);
  }

  delete(product: Product | number): Observable<Product> {
    let id = typeof (product) === 'number' ? product : product.id;
    return this.http.delete<Product>(`${this.productsUrl}/${id}`, this.httpOptions);
  }
  //#endregion Main methods
  //#region Helper methods
  getFilterUrl(key: string = 'name', filterStr: string = ''): string {
    let url: string = this.productsUrl;

    if (filterStr) {
      if (['name', 'type', 'description'].includes(key)) {
        url = `${url}?${key}_like=${filterStr}`;
      }
      else if (['id', 'catId', 'featured', 'active'].includes(key)) {
        url = `${url}?${key}=${filterStr}`;
      } else if(key === 'price') {
        url = `${url}?${key}_lte=${filterStr}`;
      }
      url += '&';
    } else {
      url += '?';
    }
    return url;
  }

  appendSortParams(
    url: string, sortKey: string = '', isDesc: boolean = false): string {
    if (sortKey) {
      url += `_sort=${sortKey}`;
      if (isDesc) {
        url += '&_order=DESC';
      }
      url += '&';
    }

    return url;
  }

  appendPaging(url: string, page: number = 0, limit: number = 50): string {
    if (limit !== -1 && page >= 0) {
      url += `_page=${page}&_limit=${limit}`;
    }

    return url;
  }
  //#endregion Helper methods
}

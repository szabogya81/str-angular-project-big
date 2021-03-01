import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ConfigService } from './config.service';

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

  productsUrl = ConfigService.productsUrl;
  categoriesUrl = ConfigService.categoriesUrl;

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
    if (productId > 0) {
      let url: string = `${this.productsUrl}/${productId}`;
      return this.http.get<Product>(url, this.httpOptions);
    } else {
      return of(new Product());
    }
  }

  getCategories(name: string = ''): Observable<Category[]> {
    let url = this.categoriesUrl;

    if (name) {
      let filter = this.escapeSpecialCharacters(name);
      url += `?name_like=${filter}`;
    }

    return this.http.get<Category[]>(url, this.httpOptions);
  }

  getCategoryById(categoryId: number): Observable<Category> {
    if (categoryId > 0) {
      let url: string = `${this.categoriesUrl}/${categoryId}`;
      return this.http.get<Category>(url, this.httpOptions);
    } else {
      return of(new Category());
    }
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
      let filter = this.escapeSpecialCharacters(filterStr);
      
      if (['name', 'type', 'description'].includes(key)) {
        url = `${url}?${key}_like=${filter}`;
      }
      else if (['id', 'catId', 'featured', 'active'].includes(key)) {
        url = `${url}?${key}=${filter}`;
      } else if (key === 'price') {
        url = `${url}?${key}_lte=${filter}`;
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

  escapeSpecialCharacters(input: string): string {
      return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  //#endregion Helper methods
}

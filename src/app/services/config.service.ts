import { Injectable } from '@angular/core';

export interface ITableCol {
  key: string;
  title: string;

  icon?: string;
  pattern?: string;
  visible?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  constructor() { }

  categoryTableColumns: ITableCol[] = [
    { key: 'id', title: 'ID', visible: true },
    { key: 'name', title: 'Name', visible: true },
    { key: 'description', title: 'Description', visible: true }
  ];

  static baseUrl: string = 'http://localhost:3000/';

  static billsUrl: string = `${ConfigService.baseUrl}bills`;
  static categoriesUrl: string = `${ConfigService.baseUrl}categories`;
  static customersUrl: string = `${ConfigService.baseUrl}customers`;
  static ordersUrl: string = `${ConfigService.baseUrl}orders`;
  static productsUrl: string = `${ConfigService.baseUrl}products`;
}

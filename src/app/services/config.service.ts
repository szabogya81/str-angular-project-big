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

  static categoriesUrl: string = `${ConfigService.baseUrl}categories`;
  static productsUrl: string = `${ConfigService.baseUrl}products`;
  static customersUrl: string = `${ConfigService.baseUrl}customers`;
}

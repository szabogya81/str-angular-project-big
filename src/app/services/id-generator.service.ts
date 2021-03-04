import { Injectable } from '@angular/core';
import { IdProvider } from "../model/id-generator/id-provider";
//import { IdRecord } from '../model/id-generator/id-record';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {

  private idList: number[] = [];

  private getMax(arr: number[]): number {
    let max = arr[0];
    for (let i=1; i<arr.length; i++) {
      if (max < arr[i]) {
        max = arr[i];
      }
    }
    return max+1;
  }

  getNextUniqueID(idProvider: IdProvider): number {
    idProvider.getAll().subscribe( records => { this.idList = records.map(rec => rec.id) });
    return this.getMax(this.idList);
  }


  constructor() { }
}
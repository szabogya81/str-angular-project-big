import { Component, OnInit } from '@angular/core';

import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  productsCount: number = 0;
  activeProductsCount: number = 0;
  activeProductsPercent: string | null = '';

  customersCount: number = 0;
  activeCustomersCount: number = 0;
  activeCustomersPercent: string | null = '';

  ordersCount: number = 0;
  unpaidOrdersCount: number = 0;
  unpaidOrdersPercent: string | null = '';

  billsValue: number = 0;
  unpaidBillsValue: number = 0;
  unpaidBillsValuePercent: string | null = '';

  constructor(
    private dashSvc: DashboardService) {
  }

  ngOnInit(): void {
    this.setProductData();
    this.setCustomerData();
    this.setOrderData();
    this.setBillsData();
  }

  //#region Main methods
  setProductData() {
    this.dashSvc.getCounts('product').subscribe(
      counts => {
        this.productsCount = counts[0];
        this.activeProductsCount = counts[1];
        this.activeProductsPercent = this.getPercentage(counts[1], counts[0]);
      }
    )
  }

  setCustomerData() {
    this.dashSvc.getCounts('customer').subscribe(
      counts => {
        this.customersCount = counts[0];
        this.activeCustomersCount = counts[1];
        this.activeCustomersPercent = this.getPercentage(counts[1], counts[0]);
      }
    )
  }

  setOrderData() {
    this.dashSvc.getCounts('order', 'status_ne=paid').subscribe(
      counts => {
        this.ordersCount = counts[0];
        this.unpaidOrdersCount = counts[1];
        this.unpaidOrdersPercent = this.getPercentage(counts[1], counts[0]);
      }
    )
  }

  setBillsData() {
    this.dashSvc.getBillSumOfValues().subscribe(
      values => {
        this.billsValue = values[0];
        this.unpaidBillsValue = values[1];
        this.unpaidBillsValuePercent = this.getPercentage(values[1], values[0]);
      }
    )
  }
  //#endregion Main methods
  //#region Helper methods
  getPercentage(dividend: number, divisor: number): string {
    let result = '0.0%';
    if (dividend > 0) {
      result =
        (dividend / divisor).toLocaleString(
          'hu-HU', {
          style: 'percent',
          minimumFractionDigits: 1,
          maximumFractionDigits: 1
        })
    }
    return result;
  }
  //#endregion Helper methods
}

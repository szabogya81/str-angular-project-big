import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BillListComponent } from './pages/bill-list/bill-list/bill-list.component';

import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'customers',
    component: CustomerListComponent
  },
  {
    path: 'orders',
    component: OrderListComponent
  },
  {
    path: 'bills',
    component: BillListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

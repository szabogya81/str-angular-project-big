import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { BillListComponent } from './pages/bill-list/bill-list.component';
import { CustomerEditComponent } from './pages/customer-edit/customer-edit.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'bills',
    component: BillListComponent
  },
  {
    path: 'customers',
    component: CustomerListComponent
  },
  {
    path: 'customers/:id',
    component: CustomerEditComponent
  },
  {
    path: 'orders',
    component: OrderListComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'products/:id',
    component: ProductEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

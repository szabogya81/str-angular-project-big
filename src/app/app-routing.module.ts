import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'customers',
    component: CustomerListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

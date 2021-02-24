import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ProductListComponent } from './pages/product-list/product-list.component';
import { OrderListComponent } from './pages/order-list/order-list/order-list.component';
import { CustomerFilterPipe } from './pipes/customer-filter.pipe';
import { OrderFilterPipe } from './pipes/order-filter.pipe';
import { BillFilterPipe } from './pipes/bill-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    OrderListComponent,
    CustomerFilterPipe,
    OrderFilterPipe,
    BillFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

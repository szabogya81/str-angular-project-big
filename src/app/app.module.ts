import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ProductListComponent } from './pages/product-list/product-list.component';
import { CustomerFilterPipe } from './pipes/customer-filter.pipe';
import { OrderFilterPipe } from './pipes/order-filter.pipe';
import { BillFilterPipe } from './pipes/bill-filter.pipe';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './common/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CustomerFilterPipe,
    OrderFilterPipe,
    BillFilterPipe,
    CustomerListComponent,
    OrderListComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    FooterComponent,
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

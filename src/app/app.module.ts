import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ConfirmDialogComponent } from './common/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './services/confirm-dialog.service';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './common/footer/footer.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';

import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

import { BillFilterPipe } from './pipes/bill-filter.pipe';
import { CustomerFilterPipe } from './pipes/customer-filter.pipe';
import { OrderFilterPipe } from './pipes/order-filter.pipe';
import { SorterPipe } from './pipes/sorter.pipe';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { BillListComponent } from './pages/bill-list/bill-list.component';
import { CustomerEditComponent } from './pages/customer-edit/customer-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    BillFilterPipe,
    ConfirmDialogComponent,
    CustomerFilterPipe,
    CustomerListComponent,
    DashboardComponent,
    FooterComponent,
    NavbarComponent,
    OrderFilterPipe,
    OrderListComponent,
    ProductEditComponent,
    ProductListComponent,
    SidebarComponent,
    SorterPipe,
    BillListComponent,
    CustomerEditComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  exports: [
    ConfirmDialogComponent
  ],
  providers: [
    ConfirmDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

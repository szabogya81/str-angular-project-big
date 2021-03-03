import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ConfirmDialogComponent } from './common/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './services/confirm-dialog.service';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './common/footer/footer.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';

import { BillListComponent } from './pages/bill-list/bill-list.component';
import { CustomerEditComponent } from './pages/customer-edit/customer-edit.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { OrderEditComponent } from './pages/order-edit/order-edit.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

import { BillFilterPipe } from './pipes/bill-filter.pipe';
import { CustomerFilterPipe } from './pipes/customer-filter.pipe';
import { OrderFilterPipe } from './pipes/order-filter.pipe';
import { SorterPipe } from './pipes/sorter.pipe';
import { ChartComponent } from './common/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    BillFilterPipe,
    BillListComponent,
    ConfirmDialogComponent,
    CustomerFilterPipe,
    CustomerListComponent,
    DashboardComponent,
    FooterComponent,
    NavbarComponent,
    OrderEditComponent,
    OrderFilterPipe,
    OrderListComponent,
    ProductEditComponent,
    ProductListComponent,
    SidebarComponent,
    SorterPipe,
    CustomerEditComponent,
    ChartComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    })
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

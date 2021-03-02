/* import { ApplicationRef, Output, ChangeDetectorRef, EventEmitter } from '@angular/core'; */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customerList$: Observable<Customer[]>;
  //customerList: Customer[] = [];

  rawCustomerKeys: Customer = new Customer();

  phrase: string = '';
  filterKey: string = 'last_name';
  filterKeyArray: string[];
  isSearchButtonVisible: boolean = true;
  //filterKeyArrays: string[] = Object.keys(new Customer());
  // @Output() notifyOnDelete: EventEmitter<number> = new EventEmitter<number>();

  // sorter
  columnKey: string = '';
  direction: string = '';

  constructor(private customerService: CustomerService, private router: Router, private confirmDialogService: ConfirmDialogService,/* , private changeDetectorRefs: ChangeDetectorRef */) {
    /* this.router.routeReuseStrategy.shouldReuseRoute = () => false; */
    this.customerList$ = this.customerService.getAll();
    /* console.log(this.customerList$.subscribe(itemList => {
      this.customerList = itemList;
      console.log(this.customerList);
    })); */

    this.filterKeyArray = this.spliceAddress();        // formázzuk az oszlopok és a filter kulcsok stringjét
  }

  ngOnInit(): void { }

  spliceAddress(): string[] {                                       // kibontjuk az addresst
    let customerKeys = Object.getOwnPropertyNames(this.rawCustomerKeys);
    const zip = Object.getOwnPropertyNames(this.rawCustomerKeys.address)[0];
    const country = Object.getOwnPropertyNames(this.rawCustomerKeys.address)[1];
    const city = Object.getOwnPropertyNames(this.rawCustomerKeys.address)[2];
    const street = Object.getOwnPropertyNames(this.rawCustomerKeys.address)[3];
    const notes = Object.getOwnPropertyNames(this.rawCustomerKeys.address)[4];

    customerKeys.splice(4, 1, zip, country, city, street, notes);   // removes Address, replaces with properties in the select option
    return customerKeys;
  }

  removeCustomer(id: number | string): void {
    const index = typeof id === 'string' ? parseInt(id, 10) : id;
    this.customerService.remove(index).subscribe(() => this.router.navigate(['/customers']));
    document.location.reload();                        // törlés után frissíti az oldalt nem szép, de működik
  }

  onConfirmDelete(id: number): void {
    this.confirmDialogService.confirmThis(
      `Are you sure to DELETE this Customer?`, () => {
        this.removeCustomer(id);
      }, () => { })
  }

  // sorter
  onColumnSelect(key: string): void {
    if (this.columnKey != key) {
      this.direction = 'asc';
    } else {
      this.direction = this.swichDirectionValue();
    }
    this.columnKey = key;
  }

  swichDirectionValue(): any {
    if (this.direction === '' || this.direction === 'dsc') {
      return this.direction = 'asc';
    }
    return this.direction = 'dsc';
  }


}

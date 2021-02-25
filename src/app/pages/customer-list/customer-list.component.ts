import { ApplicationRef, Output, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private customerService: CustomerService, private router: Router/* , private changeDetectorRefs: ChangeDetectorRef */) {
    this.customerList$ = this.customerService.getAll();
    /* console.log(this.customerList$.subscribe(itemList => {
      this.customerList = itemList;
      console.log(this.customerList);
    })); */

    let customerKeys = Object.getOwnPropertyNames(this.rawCustomerKeys);
    const zip = Object.getOwnPropertyNames(this.rawCustomerKeys.address)[0];
    const country = Object.getOwnPropertyNames(this.rawCustomerKeys.address)[1];
    const city = Object.getOwnPropertyNames(this.rawCustomerKeys.address)[2];
    const street = Object.getOwnPropertyNames(this.rawCustomerKeys.address)[3];
    const notes = Object.getOwnPropertyNames(this.rawCustomerKeys.address)[4];

    customerKeys.splice(4, 1, zip, country, city, street, notes);   // removes Address, replaces with properties in the select option
    customerKeys.splice(0, 1);        // removes id from select option

    this.filterKeyArray = customerKeys;

  }

  ngOnInit(): void { }

  removeCustomer(id: number | string): void {
    /*  const index = typeof id === 'string' ? parseInt(id, 10) : id;
     this.customerService.remove(index).subscribe(() => this.router.navigate(['/customers'])); */
  }

  // sorter
  onColumnSelect(key: string): void {
    this.columnKey = key;
  }

}

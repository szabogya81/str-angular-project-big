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
  // @Output() notifyOnDelete: EventEmitter<number> = new EventEmitter<number>();

  constructor(private customerService: CustomerService, private router: Router/* , private changeDetectorRefs: ChangeDetectorRef */) {
    this.customerList$ = this.customerService.getAll();
  }

  ngOnInit(): void { }

  removeCustomer(id: number | string): void {
    /*  const index = typeof id === 'string' ? parseInt(id, 10) : id;
     this.customerService.remove(index).subscribe(() => this.router.navigate(['/customers'])); */
  }

}

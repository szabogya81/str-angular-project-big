import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  customer$: Observable<Customer> = this.activatedRoute.params.pipe(
    switchMap(params => this.customerService.get(params.id))
  );
  customer: Customer = new Customer();
  submition: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onUpdate(form: NgForm, customer$: Customer): void {
    this.submition = true;
    if (customer$.id === 0) {
      this.customerService.create(customer$).subscribe(
        () => {
          this.toastr.success('New Customer Added', 'Customer Create');
          this.router.navigate(['/customers']);
        },
        () => {
          this.toastr.error('Error occured while adding new Customer', 'Customer Create');
        }
      );
    } else {
      this.customerService.update(customer$).subscribe(
        () => {
          this.toastr.success('Customer Updated Successfully', 'Customer Update');
          this.router.navigate(['/customers']);
        },
        () => {
          this.toastr.error('Error occured while updating Customer', 'Customer Update');
        }
      );
    }
  }

}

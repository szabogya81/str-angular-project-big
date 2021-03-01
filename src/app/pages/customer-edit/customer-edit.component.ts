import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private activatedRoute: ActivatedRoute, private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
  }

  onUpdate(form: NgForm, customer$: Customer): void {

    if (customer$.id === 0) {
      this.customerService.create(this.customer).subscribe(
        () => this.router.navigate(['/customers'])
      );
    } else {
      this.customerService.update(customer$).subscribe(
        () => this.router.navigate(['/customers'])
      );
    }
  }

}

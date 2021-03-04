import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Address } from 'src/app/model/address';
import { Customer } from 'src/app/model/customer';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { Status } from 'src/app/model/status.enum';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {

  order$: Observable<Order> = this.activatedRoute.params.pipe(
    switchMap(params => this.orderService.get(params.id))
  );

  order: Order = new Order();

  orderStatus = Status;
  
  choosenCustomer: Customer = new Customer();
  choosenProduct: Product = new Product();
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.order$.subscribe(
      ordr => this.orderService.getCustomerIdById(ordr.customerID)
        .subscribe(cusID => this.choosenCustomer = cusID));
    this.order$.subscribe(
      prod => this.orderService.getProductIdById(prod.productID)
        .subscribe(prodID => this.choosenProduct = prodID));
  }

  searchCustomer = (text$: Observable<string>) => text$.pipe(
    debounceTime(300),
    switchMap(
      txt => this.orderService.likeCustomer('last_name', txt)
    )
  );

  customerResultFormatter(customer: Customer): string {
    return `${customer.first_name} ${customer.last_name}`;
  }

  customerInputFormatter(customer: Customer): string {
    if (!customer.id) {
      return '';
    }
    return `#${customer.id} - ${customer.first_name} ${customer.last_name}`;
  }

  searchProduct = (text$: Observable<string>) => text$.pipe(
    debounceTime(300),
    switchMap(
      txt => this.orderService.likeProduct('name', txt)
    )
  );

  productResultFormatter(product: Product): string {
    return `${product.name}`;
  }

  productInputFormatter(product: Product): string {
    if (!product.id) {
      return '';
    }
    return `# ${product.id} - ${product.name}`;
  }

  productPriceInputFormatter(product: Product): string {
    if (!product.id) {
      return '';
    }
    return `${product.price}`;
  }


  onUpdate(form: NgForm, order$: Order): void {

    order$.customerID = this.choosenCustomer.id;
    order$.productID = this.choosenProduct.id;
    order$.amount = this.choosenProduct.price;
    if (order$.id === 0) {
      this.orderService.create(order$).subscribe(
        () => {
          this.toastr.success('New Order Added', 'Order Create');
          this.router.navigate(['/orders']);
        },
        () => {
          this.toastr.error('Error occured while adding new Order', 'Order Create');
        }
      );
    } else {
      this.orderService.update(order$).subscribe(
        () => {
          this.toastr.success('Order Updated Successfully', 'Order Update');
          this.router.navigate(['/orders']);
        },
        () => {
          this.toastr.error('Error occured while updating Order', 'Customer Order');
        }
      );
    }
  }
  


}

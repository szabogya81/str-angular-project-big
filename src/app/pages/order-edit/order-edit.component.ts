import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Order } from 'src/app/model/order';
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

  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
  }

  onUpdate(form: NgForm, order$: Order): void {

    if (order$.id === 0) {
      this.orderService.create(this.order).subscribe(
        () => this.router.navigate(['/orders'])
      );
    } else {
      this.orderService.update(order$).subscribe(
        () => this.router.navigate(['/orders'])
      );
    }
  }

}

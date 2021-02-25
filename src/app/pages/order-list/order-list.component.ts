import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orderList: Observable<Order[]> = this.orderService.getAll();

  txt: string = '';
  phraseKey: string = 'notset';


  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

}

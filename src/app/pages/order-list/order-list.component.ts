import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orderList: Observable<Order[]> = this.orderService.getAll();

  txt: string = '';
  phraseKey: string = 'id';
  keyArray: string[] = Object.keys(new Order());

  // sorter
  columnKey: string = '';
  direction: string = '';


  constructor(private orderService: OrderService, private router: Router, private confirmDialogService: ConfirmDialogService) { }

  ngOnInit(): void {
  }


  updateOrders() {
    this.orderList = this.orderService.getAll();
  }


  onDelete(id: number) {
    this.orderService.remove(id).subscribe(
      () => this.updateOrders()
    );
  }


  onConfirmDelete(id: number) {
    this.confirmDialogService.confirmThis(
      "Are you sure to delete this Order?",
      () => {
        this.onDelete(id);
      }, () => { })
    }


  // sorter
  onColumnSelect(key: string): void {
    this.swichDirectionValue();
    this.columnKey = key;
  }

  swichDirectionValue(): any {
    if ( this.direction === '' || this.direction === 'dsc') {
      return this.direction = 'asc';
    }
    return this.direction = 'dsc';
  }





}


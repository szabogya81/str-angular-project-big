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

  // Filter
  onFilterKeyChange() {
    this.txt = ""; // Clear filter
  }

  // sorter
  columnKey: string = '';
  direction: string = '';


  constructor(private orderService: OrderService, private router: Router, private confirmDialogService: ConfirmDialogService) { }

  ngOnInit(): void {
  }

onUpdate(order: Order): void {
    this.orderService.update(order).subscribe(
    updatedOrder => console.log(updatedOrder)
  )
}

  onDelete(id: number): void {
    this.orderService.remove(id).subscribe();
    document.location.reload();
  }

  onConfirmDelete(id: number): void {
      this.confirmDialogService.confirmThis(
        "Are you sure to delete this Order?",
        () => { this.onDelete(id); },
        () => { })
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
    switch (this.direction) {
      case 'asc':
        return this.direction = 'dsc';
      case 'dsc':
        return this.direction = 'asc';
      default:
        return this.direction = 'asc';
    }
  }


}


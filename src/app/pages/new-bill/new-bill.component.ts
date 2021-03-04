import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill.service';
import { IdGeneratorService } from 'src/app/services/id-generator.service';
import { OrderService } from 'src/app/services/order.service'
import { Order } from 'src/app/model/order'
import { Status } from 'src/app/model/status.enum';
import { Observable } from 'rxjs';
//import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.scss']
})
export class NewBillComponent implements OnInit {

  nextID: number;
  
  orderList: Observable<Order[]> = this.orderService.getAll();

  constructor(
    private billService: BillService,
    private orderService: OrderService,
    private idGenerator: IdGeneratorService
  ) {
    this.nextID = this.getId();
  }

  ngOnInit(): void {
  }

  getId(): number {
    return this.idGenerator.getNextUniqueID(this.billService);
  }

  setId() {
    this.nextID = this.idGenerator.getNextUniqueID(this.billService);
  //  this.getOrderIds();
  }

  // getOrderIds() {
  //   this.orderService.getAll().subscribe(
  //     records => { this.orderIdList = records.filter(rec => rec.status==Status.New) }); //.map(rec => rec.id)
  //     console.log(this.orderIdList);
  // };
}

import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill.service';
import { IdGeneratorService } from 'src/app/services/id-generator.service';
import { OrderService } from 'src/app/services/order.service'
import { Order } from 'src/app/model/order'
import { Bill } from 'src/app/model/bill'
import { Status } from 'src/app/model/status.enum';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.scss']
})
export class NewBillComponent implements OnInit {


  orderList: Observable<Order[]> = this.orderService.getAll();
  newOrder: Order = new Order();
  newBill: Bill = new Bill();
  //isSubmitEnabled: boolean = true;
  submition: boolean = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private billService: BillService,
    private orderService: OrderService,
    private idGenerator: IdGeneratorService
  ) {
    this.newBill.id = this.getId();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submition = true;
    this.newBill.id = this.getId();
    this.newBill.orderID = this.newOrder.id;
    this.newBill.amount = this.newOrder.amount as number;
    this.newBill.status = Status.New;
    this.createBill(this.newBill);
  };

  getId(): number {
    return this.idGenerator.getNextUniqueID(this.billService);
  }

  createBill(bill: Bill): boolean {
    this.billService.create(bill).subscribe(
      () => {
        this.toastr.success('New Bill created', 'Bill Create');
        this.router.navigate(['/bills']);
      },
      () => {
        this.toastr.error('Error occured while creating new Bill', 'Bill Create');
        return false;
      }
    );
    return true;
  }
}

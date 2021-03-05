import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { Status } from 'src/app/model/status.enum';
import { BillService } from 'src/app/services/bill.service';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


export enum Order {
  asc,
  desc,
  none
}


@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent implements OnInit {


  bills: Observable<Bill[]> = this.billService.getAll();

  filterText: string = '';
  filterKey: string = 'id';
  filterKeys: string[] = Object.keys(new Bill());

  // Sorter
  columnKey: string = '';
  direction: string = '';


  constructor(
    private billService: BillService,
    private router: Router,
    private confirmDialogService: ConfirmDialogService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  voidBill(bill: Bill): void {
    bill.amount = 0;
    bill.status = Status.Paid;
    this.billService.update(bill).subscribe(
      updatedBill => console.log(updatedBill),
      () => this.toastr.error('Error occured while modifying Bill', 'Bill modify'),
      () => this.toastr.success('Bill successfully Voided', 'Bill Modify')
    );
  }

  setToPaid(bill: Bill): void {
    bill.status = Status.Paid;
    this.billService.update(bill).subscribe(
      (updatedBill) => console.log(updatedBill),
      () => this.toastr.error('Error occured while modifying Bill', 'Bill modify'),
      () => this.toastr.success('Bill successfully set to Paid', 'Bill Modify')
    );
  }


  // Filter
  onFilterKeyChange() {
    this.filterText = ""; // Clear filter
  }

  onConfirmVoid(bill: Bill) {
    this.confirmDialogService.confirmThis(
      `Do you really want to void this Bill?
      Order ID: #${bill.orderID}`,
      () => { this.voidBill(bill); },
      () => { }
    )
  }

  onConfirmPaid(bill: Bill) {
    this.confirmDialogService.confirmThis(
      `Do you really want this Bill set to Paid?
      Order ID: #${bill.orderID}`,
      () => { this.setToPaid(bill); },
      () => { }
    )
  }


  // Sorter
  onColumnSelect(key: string): void {
    // first click on the column
    if (this.columnKey != key) {
      this.direction = 'asc';
    } else {
      // 2nd, 3rd, etc. click on the same column.
      // list order should be switched.
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

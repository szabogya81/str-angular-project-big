import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { Status } from 'src/app/model/status.enum';
import { BillService } from 'src/app/services/bill.service';


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


  constructor(private billService: BillService) { 
  }

  ngOnInit(): void {
  }

  // Filter
  onFilterKeyChange() {
    this.filterText = ""; // Clear filter
  }

  // Sorter
  onColumnSelect(key: string): void {
    // first click on the column
    if (this.columnKey != key) {
      this.direction = 'asc';
    } else {
      // 2nd, 3rd, etc. click on the same column.
      // list order should by switched.
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


  getId(): void {
    console.log("Debug: BillListComponent.getId()");
  }
}

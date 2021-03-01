import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { Status } from 'src/app/model/status.enum';
import { BillService } from 'src/app/services/bill.service';

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

  constructor(private billService: BillService) { 
  }

  ngOnInit(): void {
  }

}

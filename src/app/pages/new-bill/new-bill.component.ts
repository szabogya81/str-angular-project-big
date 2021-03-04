import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill.service';
import { IdGeneratorService } from 'src/app/services/id-generator.service';
//import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.scss']
})
export class NewBillComponent implements OnInit {

  nextID: number;
  

  constructor(
    private billService: BillService,
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
  }
}

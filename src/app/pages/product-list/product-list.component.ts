import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Observable<Product[]>;
  phrase: string = '';
  column: string = '';

  constructor(private prodSvc: ProductService) {
    this.products = prodSvc.getAll();
  }

  ngOnInit(): void {
  }

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  onColumnSelect(key: string): void {
    this.column = key;
  }

}

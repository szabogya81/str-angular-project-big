import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { ProductService } from 'src/app/services/product.service';

import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {

  categories: Map<number, string> = new Map();
  products: Observable<Product[]>;

  filter: string = '';
  filterColumn: string = 'name';

  sortColumn: string = '';
  sortDesc: boolean = false;

  pageStart: number = 0;
  pageLimit: number = 20;
  isFlagFilter: boolean = false;

  actionEvent: boolean = false;
  clickedElementID?: number = 0;

  constructor(
    private prodSvc: ProductService,
    private confirmDialogService: ConfirmDialogService,) {
    this.products = prodSvc.get(
      this.filterColumn, this.filter, this.pageStart, this.pageLimit);
  }

  ngOnInit(): void {
    this.prodSvc.getCategories().forEach(
      items => items.forEach(item => this.categories.set(item.id, item.name)));
  }

  //#region Main methods
  onSearch(filter: string) {
    this.filter = filter;
    this.updateProducts();
  }

  onColumnSelect(key: string): void {
    this.sortDesc = this.sortColumn === key && !this.sortDesc;
    this.sortColumn = key;
    this.updateProducts();
  }

  onSelectChanged(event: Event): void {
    event.preventDefault()
    this.filterColumn = this.getFilterColumn(event);

    this.setActiveFilter(event);
    (event.target as HTMLButtonElement).parentElement?.querySelectorAll('input')
      .forEach(input => input.checked = false);

    if (this.isFlagFilter) {
      this.filter = '';
    }

    this.updateProducts();
    this.isFlagFilter = false;
  }

  onFlagSelect(event: Event): void {
    event.preventDefault()

    this.isFlagFilter = true;
    this.filterColumn = this.getFilterColumn(event);

    this.setActiveFilter(event);
    this.handleFlagCheck(event);

    (document.querySelector('#searchInput') as HTMLInputElement).value = '';
    this.updateProducts();
  }

  onDelete(productId: number) {
    this.clickedElementID = productId;
    this.prodSvc.delete(productId).subscribe(
      () => this.updateProducts()
    );
  }

  onConfirmDelete(productId: number) {
    this.confirmDialogService.confirmThis(
      "Are you sure to delete Product?",
      () => {
        this.actionEvent = true;
        this.onDelete(productId);
      }, () => { })
  }

  onCreate(product: Product) {
    this.prodSvc.create(product).subscribe(
      () => this.updateProducts()
    );
  }

  onUpdate(product: Product) {
    this.prodSvc.update(product).subscribe(
      () => this.updateProducts()
    );
  }
  //#endregion Main methods
  //#region Helper methods
  getFilterColumn(event: Event): string {
    return (event.target as HTMLButtonElement).value;
  }

  setActiveFilter(event: Event) {
    (event.target as HTMLButtonElement).parentElement?.querySelectorAll('.btn')
      .forEach(btn => btn.classList.remove('active'));
    (event.target as HTMLButtonElement).classList.add('active');
  }

  handleFlagCheck(event: Event) {
    let innerCheckbox =
      ((event.target as HTMLButtonElement).firstElementChild as HTMLInputElement);
    let checked = !(innerCheckbox.checked);

    document.querySelectorAll('.flag-filter')
      .forEach(el => (el as HTMLInputElement).checked = false);
    innerCheckbox.checked = checked;

    this.filter = innerCheckbox.checked.toString();
  }

  updateProducts() {
    this.products = this.prodSvc.get(
      this.filterColumn, this.filter, this.pageStart,
      this.pageLimit, this.sortColumn, this.sortDesc);
    this.actionEvent = false;
  }

  setPageSize(event: Event): void {
    event.preventDefault()
    this.pageLimit = parseInt((event.target as HTMLButtonElement).value, 10);

    (event.target as HTMLButtonElement).parentElement?.querySelectorAll('.btn')
      .forEach(btn => btn.classList.remove('active'));
    (event.target as HTMLButtonElement).classList.add('active');

    this.updateProducts();
  }

  //#endregion
}

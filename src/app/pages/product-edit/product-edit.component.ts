import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { ProductType } from 'src/app/model/product-type.enum';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})

export class ProductEditComponent implements OnInit {

  product: Observable<Product> = this.activatedRoute.params.pipe(
    switchMap(params => this.prodSvc.getById(params.id))
  );

  productType = ProductType;
  selectedCategory: Category = new Category();

  constructor(
    private activatedRoute: ActivatedRoute,
    private prodSvc: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.product.subscribe(
      prod => this.prodSvc.getCategoryById(prod.catId)
        .subscribe(cat => this.selectedCategory = cat));
  }

  onUpdate(product: Product): void {

    product.catId = this.selectedCategory.id;

    if (product.id === 0) {
      this.prodSvc.create(product).subscribe(
        () => this.router.navigate(['/products'])
      );
    } else {
      this.prodSvc.update(product).subscribe(
        () => this.router.navigate(['/products'])
      );
    }
  }

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(150),
    distinctUntilChanged(),
    switchMap(
      txt => this.prodSvc.getCategories(txt)
    )
  )

  categoryResultFormatter(category: Category): string {
    return `#${category.id} - ${category.name}`;
  }

  categoryIputFormatter(category: Category): string {
    if (!category.id) {
      return '';
    }
    return `#${category.id} - ${category.name}`;
  }
}

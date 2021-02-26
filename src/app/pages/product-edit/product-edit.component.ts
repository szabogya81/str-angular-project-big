import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';

import { ITableCol, ConfigService } from 'src/app/services/config.service';
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

  selectedCategory: Category = new Category();

  fields: ITableCol[] = this.config.categoryTableColumns.filter(
    col => col.visible
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private config: ConfigService,
    private prodSvc: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.product.subscribe( 
      prod =>  this.prodSvc.getCategoryById(prod.catId)
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
    switchMap(
      txt => this.prodSvc.getCategories(txt)
    )
  )

  categoryResultFormatter(category: Category): string {
    return `${category.name}`;
  }

  categoryIputFormatter(category: Category): string {
    if (!category.id) {
      return '';
    }
    return `#${category.id} - ${category.name}`;
  }
}

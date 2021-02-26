import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})

export class ProductEditComponent implements OnInit {

  product: Observable<Product> = this.activatedRoute.params.pipe(
    switchMap(params => this.prodSvc.getById(params.id))
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private prodSvc: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  onUpdate(product: Product): void {
    if (product.id === 0) {
      this.prodSvc.create(product).subscribe(
        () => this.router.navigate([''])
      );
    } else {
      this.prodSvc.update(product).subscribe(
        () => this.router.navigate([''])
      );
    }
  }
}

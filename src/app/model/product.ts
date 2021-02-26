import { ProductType } from "./product-type.enum";

export class Product {
  id: number = 0;
  name: string = '';
  catId: number = 0;
  type: ProductType = ProductType.Action;
  description: string = '';
  price: number = 0;
  featured: boolean = false;
  active: boolean = false;

  imagePath: string = '';
}

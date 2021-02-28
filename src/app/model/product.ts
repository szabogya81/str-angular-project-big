import { ProductType } from "./product-type.enum";

export class Product {
  [key: string] : any;
  id: number = 0;
  name: string = '';
  catId: number = 0;
  type: ProductType = ProductType.Action;
  description: string = '';
  price?: number;
  featured: boolean = false;
  active: boolean = false;
}

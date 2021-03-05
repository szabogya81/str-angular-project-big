import { Address } from "./address";

export class Customer {
  id: number = 0;
  first_name: string = '';
  last_name: string = '';
  email: string = '@';
  address: Address = new Address();
  active: boolean = true;
}

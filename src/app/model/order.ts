import { Product } from "./product";
import { Status } from "./status.enum";

export class Order {
    id: number = 0;
    customerID: number = 0;
    products: Product[] = [];
    amount: number = 0;
    status: Status = Status.New;
}

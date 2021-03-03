import { Status } from "./status.enum";

export class Order {
    id: number = 0;
    customerID?: number;
    productID?: number;
    amount?: number;
    status?: Status;
}

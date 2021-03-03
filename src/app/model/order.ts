import { Status } from "./status.enum";

export class Order {
    id: number = 0;
    customerID: number = 0;
    productID?: number;
    amount?: number;
    status?: Status;
}

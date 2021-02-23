import { Status } from "./status.enum";

export class Bill {
    id: number = 0;
    orderID: number = 0;
    amount: number = 0;
    status: Status = Status.New;
}

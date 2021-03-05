import { Status } from "./status.enum";
import { IdRecord } from "./id-generator/id-record";

export class Bill implements IdRecord {
    id: number = 0;
    orderID: number = 0;
    amount: number = 0;
    status: Status = Status.New;
}

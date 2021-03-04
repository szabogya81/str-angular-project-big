import { Observable } from "rxjs";
import { IdRecord } from "./id-record";

export interface IdProvider {
    getAll(): Observable<IdRecord[]>
}

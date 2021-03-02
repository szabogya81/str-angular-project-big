import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../model/status.enum';

@Pipe({
  name: 'orderFilter'
})
export class OrderFilterPipe implements PipeTransform {

  transform(value: any[] | null, key: string, txt: string | number | Status): any[] | null {
    if (!Array.isArray(value) || !key || !txt ) {
      return value;
    }

    txt = typeof txt !== 'number' ? ('' + txt).toLowerCase() : txt;

    return value.filter( item => {
      if (key == 'amount') {
        return item[key] <= (txt as string);
      }
      if (key == 'id' || key == 'customerID' || key == 'productID') {
        return item[key] == (txt as string);
      }

      return ('' + item[key]).toLowerCase() == txt as string;

    });
  }
}

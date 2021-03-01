import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../model/status.enum';

@Pipe({
  name: 'billFilter'
})
export class BillFilterPipe implements PipeTransform {

  transform(value: any[] | null, key: string, filterText: string | number | Status): any[] | null {
    if (!Array.isArray(value) || !key || !filterText ) {
      return value;
    }

    filterText = typeof filterText !== 'number' ? ('' + filterText).toLowerCase() : filterText;

    return value.filter( item => {
      if (key == 'amount') {
        return item[key] <= (filterText as string);
      }
      if (key == 'id' || key == 'orderID') {
        return item[key] == (filterText as string);
      }

      return ('' + item[key]).toLowerCase().includes((filterText as string));

    });
  }

}

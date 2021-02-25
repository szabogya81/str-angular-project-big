import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../model/status.enum';

@Pipe({
  name: 'billFilter'
})
export class BillFilterPipe implements PipeTransform {

  transform(value: any[] | null, key: string, filterText: string | number | Status): any[] | null {
    if (!Array.isArray(value) || !key || !filterText) {
      return value;
    }

    filterText = typeof filterText !== 'number' ? ('' + filterText).toLowerCase() : filterText;

    return value.filter( item => {
      if (typeof item[key] === 'number' && typeof filterText === 'number') {
        return item[key] === filterText;
      }

      return ('' + item[key]).toLowerCase().includes((filterText as string));

    });
  }

}

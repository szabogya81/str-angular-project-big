import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerFilter'
})
export class CustomerFilterPipe implements PipeTransform {

  transform(value: any[] | null, key: string, filterText: string | number | boolean): any[] | null {
    if (!Array.isArray(value) || !key || !filterText) {
      return value;
    }

    filterText = typeof filterText !== 'number' ? ('' + filterText).toLowerCase() : filterText;

    return value.filter(item => {
      if (key == 'zip' || key == 'country' || key == 'city' || key == 'street' || key == 'notes') {
        return ('' + item.address[key]).toLowerCase().includes((filterText as string));
      }

      return ('' + item[key]).toLowerCase().includes((filterText as string));

    });
  }

}

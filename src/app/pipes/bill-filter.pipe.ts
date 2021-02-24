import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'billFilter'
})
export class BillFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

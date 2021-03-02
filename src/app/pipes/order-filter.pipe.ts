import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderFilter'
})
export class OrderFilterPipe implements PipeTransform {

  transform(value: any[] | null, phrase: string = "", key: string = ""): any[] | null {
   if (!phrase || !value) {
      return value;
    }

    phrase = phrase.toLowerCase();
    return value.filter(item => {

      if (key == 'id'  || key == 'customerID' || key == 'productID' ) {
         return item[key] == (phrase as string);
      }
      if (key == 'amount') {
        return item[key] <= (phrase as string);
      }
      if (!key) {
        return item[key] <= (phrase as string);
      }

      return ('' + item[key]).toLowerCase().includes((phrase));
    });
  }
}

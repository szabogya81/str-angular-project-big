import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter'
})
export class SorterPipe implements PipeTransform {


  transform(value: any[] | null, direction: string, key: string): any[] | null {

    if (!Array.isArray(value) || !key || !direction) {
      return value;
    }

    let sortedItems = [];
    sortedItems = direction === 'asc' ? this.sortAscending(value, key) : this.sortDescending(value, key)

    return sortedItems;

  }

  sortAscending(value: any[], key: string): any[] {
    return value.sort((a, b) => {

      if (typeof (a[key]) === 'number' && typeof (b[key]) === 'number') {
        return a[key] - b[key];
      } else {
        let result;
        if (key == 'active') {                                       // a kisbetűs értékek miatt kell külön vizsgálni az active-ot
          a[key] = ('' + a[key]).toLowerCase();
          b[key] = ('' + b[key]).toLowerCase();
        }
        switch (key) {                                               // address propertyk
          case 'zip':
            result = a.address.zip - b.address.zip;
            break;
          case 'country':
            result = a.address.country.localeCompare(b.address.country);
            break;
          case 'city':
            result = a.address.city.localeCompare(b.address.city);
            break;
          case 'street':
            result = a.address.street.localeCompare(b.address.street);
            break;
          case 'notes':
            result = a.address.notes.localeCompare(b.address.notes);
            break;
          default:                                                  // minden más, kivéve az id
            result = a[key].localeCompare(b[key]);
            break;
        }
        return result;
      }

    })
  }

  sortDescending(value: any[], key: string): any[] {
    return value.sort((a, b) => {

      if (typeof (a[key]) === 'number' && typeof (b[key]) === 'number') {
        return b[key] - a[key];
      } else {
        let result;
        if (key == 'active') {                                       // a kisbetűs értékek miatt kell külön vizsgálni az active-ot
          a[key] = ('' + a[key]).toLowerCase();
          b[key] = ('' + b[key]).toLowerCase();
        }
        switch (key) {                                               // address propertyk
          case 'zip':
            result = b.address.zip - a.address.zip;
            break;
          case 'country':
            result = b.address.country.localeCompare(a.address.country);
            break;
          case 'city':
            result = b.address.city.localeCompare(a.address.city);
            break;
          case 'street':
            result = b.address.street.localeCompare(a.address.street);
            break;
          case 'notes':
            result = b.address.notes.localeCompare(a.address.notes);
            break;
          default:                                                  // minden más, kivéve az id
            result = b[key].localeCompare(a[key]);
            break;
        }
        return result;
      }

    })
  }


}

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter',
  // pure:false //anything change will filter
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string, ...args: unknown[]): unknown {
    if (value.length == 0 || filterString === '') {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reversePipe'
})
export class ReversePipePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (value.length > 0) {
      return value.split('').reverse().join('');
    }
    return  value;
  }

}

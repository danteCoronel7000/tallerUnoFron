import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfecha',
  standalone: true
})
export class SearchfechaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

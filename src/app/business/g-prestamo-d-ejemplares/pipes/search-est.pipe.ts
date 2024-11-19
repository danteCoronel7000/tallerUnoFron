import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchEst',
  standalone: true
})
export class SearchEstPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

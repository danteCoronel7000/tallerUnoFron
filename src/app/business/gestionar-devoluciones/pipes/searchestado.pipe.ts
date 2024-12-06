import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchestado',
  standalone: true
})
export class SearchestadoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

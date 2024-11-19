import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarEst',
  standalone: true
})
export class FiltrarEstPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

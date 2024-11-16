import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asignoasig',
  standalone: true
})
export class AsignoasigPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

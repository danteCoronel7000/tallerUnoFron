import { Pipe, PipeTransform } from '@angular/core';
import { MPrestamo } from '../models/list-prestamos.model';

@Pipe({
  name: 'searchest',
  standalone: true
})
export class SearchestPipe implements PipeTransform {

  transform(prestamos: MPrestamo[], searchEst: string): MPrestamo[] {
    if (!prestamos || !searchEst) {
      return prestamos;
    }

    searchEst = searchEst.toLowerCase();

    return prestamos.filter((prestamo) => {
      const nombrePersona = prestamo.realiza?.persona?.nombre?.toLowerCase() || '';
      return nombrePersona.includes(searchEst);
    });
  }


}

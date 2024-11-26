import { Pipe, PipeTransform } from '@angular/core';
import { MDevolucion } from '../models/devolucion.model';

@Pipe({
  name: 'searchestudiant',
  standalone: true
})
export class SearchestudiantPipe implements PipeTransform {

  transform(mdevolucion: MDevolucion[], searchEst: string): MDevolucion[] {
    if (!mdevolucion || !searchEst) {
      return mdevolucion;
    }

    searchEst = searchEst.toLowerCase();

    return mdevolucion.filter((mprestamo) => {
      const nombrePersona = mprestamo.mprestamo.realiza?.persona?.nombre?.toLowerCase() || '';
      return nombrePersona.includes(searchEst);
    });
  }

}

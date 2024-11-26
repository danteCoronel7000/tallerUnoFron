import { Pipe, PipeTransform } from '@angular/core';
import { MDevolucion } from '../models/devolucion.model';

@Pipe({
  name: 'searchfinifin',
  standalone: true
})
export class SearchfinifinPipe implements PipeTransform {

  transform(mdevolucion: MDevolucion[], startDate: string | null, endDate: string | null): MDevolucion[] {
    
    if (!startDate || !endDate) {
      return mdevolucion; // Si no hay rango, devolver la lista completa.
    }

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    return mdevolucion.filter((mdevl) => {
      const fechaString = mdevl.mprestamo?.fecha;
      
      // Si no hay fecha o no es válida, ignorar el elemento
      if (!fechaString || isNaN(new Date(fechaString).getTime())) {
        return false;
      }
    
      const fecha = new Date(fechaString).getTime();
      return fecha >= start && fecha <= end;
    });
  }

}

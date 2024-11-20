import { Pipe, PipeTransform } from '@angular/core';
import { MPrestamo } from '../models/list-prestamos.model';

@Pipe({
  name: 'searchfecha',
  standalone: true
})
export class SearchfechaPipe implements PipeTransform {

  transform(prestamos: MPrestamo[], startDate: string | null, endDate: string | null): MPrestamo[] {
    
    if (!startDate || !endDate) {
      return prestamos; // Si no hay rango, devolver la lista completa.
    }

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    return prestamos.filter((prestamo) => {
      const fecha = new Date(prestamo.fecha).getTime();
      return fecha >= start && fecha <= end;
    });
  }
}

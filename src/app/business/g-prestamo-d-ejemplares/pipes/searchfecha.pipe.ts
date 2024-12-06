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
      const fechaString = prestamo.fecha;
  
      // Si no hay fecha o no es válida, ignorar el elemento
      if (!fechaString) {
        return false;
      }
  
      const [day, month, year] = fechaString.split('/').map(Number);
      const fecha = new Date(year, month - 1, day).getTime();
  
      console.log('fechaString:', fechaString);
      console.log('start:', start, 'end:', end, 'fecha:', fecha);
  
      return fecha >= start && fecha <= end;
    });
  }
}

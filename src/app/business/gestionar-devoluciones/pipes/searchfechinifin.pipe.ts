import { Pipe, PipeTransform } from '@angular/core';
import { MDevolucion } from '../models/mdevolucion.model';

@Pipe({
  name: 'searchfechinifin',
  standalone: true
})
export class SearchfechinifinPipe implements PipeTransform {

  transform(mdevolucion: MDevolucion[], startDate: string | null, endDate: string | null): MDevolucion[] {
    console.log('fechaini fecha fin pipe: ', startDate, endDate);
    
    if (!startDate || !endDate) {
      return mdevolucion; // Si no hay rango, devolver la lista completa.
    }
  
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
  
    return mdevolucion.filter((mdevl) => {
      const fechaString = mdevl.mprestamo.fecha;
  
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

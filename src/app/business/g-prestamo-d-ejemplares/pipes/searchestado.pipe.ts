import { Pipe, PipeTransform } from '@angular/core';
import { MPrestamo } from '../models/list-prestamos.model';

@Pipe({
  name: 'searchestado',
  standalone: true
})
export class SearchestadoPipe implements PipeTransform {

  transform(value: MPrestamo[], searchInput: string): MPrestamo[] {
    if (!value || value.length === 0) {
      return []; // Si no hay datos, retorna una lista vacía
    }

    if (!searchInput || searchInput.trim() === '') {
      return value; // Si no hay texto de búsqueda, retorna la lista completa
    }

    // Intentar convertir el texto de búsqueda a un número
    const searchText = Number(searchInput.trim());
    if (isNaN(searchText)) {
      // Si la conversión falla, retorna la lista completa o haz algo más
      return value;
    }

    // Si el valor de búsqueda es "2", retornar toda la lista
    if (searchText === 2) {
      return value;
    }

    // Filtrar la lista de textos para otros valores
    return value.filter(mprestamo => mprestamo.estado === searchText);
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { AreaNotUndefined } from '../models/list-areas.model';

@Pipe({
  name: 'searcharea',
  standalone: true
})
export class SearchareaPipe implements PipeTransform {

  transform(value: AreaNotUndefined[], searchInput: string): AreaNotUndefined[] {
    if (!value || value.length === 0) {
      return []; // Si no hay datos, retorna una lista vacía
    }

    if (!searchInput || searchInput.trim() === '') {
      return value; // Si no hay texto de búsqueda, retorna la lista completa
    }

    // Convertimos el texto de búsqueda a minúsculas para una comparación insensible a mayúsculas
    const searchText = searchInput.toLowerCase().trim();

    // Filtramos la lista de usuarios
    return value.filter(persona => persona.nombre.toLowerCase().includes(searchText));
  }

}

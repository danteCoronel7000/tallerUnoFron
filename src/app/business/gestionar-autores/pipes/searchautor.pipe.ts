import { Pipe, PipeTransform } from '@angular/core';
import { AutorNotUndefined } from '../models/list-autores.model';

@Pipe({
  name: 'searchautor',
  standalone: true
})
export class SearchautorPipe implements PipeTransform {

  transform(value: AutorNotUndefined[], searchInput: string): AutorNotUndefined[] {
    if (!value || value.length === 0) {
      return []; // Si no hay datos, retorna una lista vacía
    }

    if (!searchInput || searchInput.trim() === '') {
      return value; // Si no hay texto de búsqueda, retorna la lista completa
    }

    // Convertimos el texto de búsqueda a minúsculas para una comparación insensible a mayúsculas
    const searchText = searchInput.toLowerCase().trim();

    // Filtramos la lista de usuarios
    return value.filter(persona =>
      persona.nombre.toLowerCase().includes(searchText) ||
      persona.ap.toLowerCase().includes(searchText) ||
      persona.am.toLowerCase().includes(searchText)
    );
  }

}

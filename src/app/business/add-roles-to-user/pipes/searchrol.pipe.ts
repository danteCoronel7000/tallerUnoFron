import { Pipe, PipeTransform } from '@angular/core';
import { rol } from '../models/rol-user.model';

@Pipe({
  name: 'searchrol',
  standalone: true
})
export class SearchrolPipe implements PipeTransform {

  transform(value: rol[], searchInput: string): rol[] {
    if (!value || value.length === 0) {
      return []; // Si no hay datos, retorna una lista vacía
    }

    if (!searchInput || searchInput.trim() === '') {
      return value; // Si no hay texto de búsqueda, retorna la lista completa
    }

    // Convertimos el texto de búsqueda a minúsculas para una comparación insensible a mayúsculas
    const searchText = searchInput.toLowerCase().trim();

    // Filtramos la lista de usuarios
    return value.filter(rol =>
      rol.nombre.toLowerCase().includes(searchText)
    );
  }

}

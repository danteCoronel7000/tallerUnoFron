import { Pipe, PipeTransform } from '@angular/core';
import { Persona } from '../models/usuarios.model';

@Pipe({
  name: 'searchtipo',
  standalone: true
})
export class SearchtipoPipe implements PipeTransform {

  transform(value: Persona[], searchInput: string): Persona[] {
    if (!value || value.length === 0) {
      return []; // Si no hay datos, retorna una lista vacía
    }

    if (!searchInput || searchInput.trim() === 'todos') {
      return value; // Si no hay texto de búsqueda, retorna la lista completa
    }

    // Convertimos el texto de búsqueda a minúsculas para una comparación insensible a mayúsculas
    const searchArea = searchInput.toLowerCase().trim();

    // Filtramos la lista de usuarios
    return value.filter(per =>
      per.tipo_per.toLowerCase().includes(searchArea)
    );
  }

}

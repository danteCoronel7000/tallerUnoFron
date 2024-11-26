import { Pipe, PipeTransform } from '@angular/core';
import { Texto } from '../models/busqueda.model';

@Pipe({
  name: 'searcharea',
  standalone: true
})
export class SearchareaPipe implements PipeTransform {

  transform(value: Texto[], searchInput: string): Texto[] {
    if (!value || value.length === 0) {
      return []; // Si no hay datos, retorna una lista vacía
    }

    if (!searchInput || searchInput.trim() === '') {
      return value; // Si no hay texto de búsqueda, retorna la lista completa
    }

    // Convertimos el texto de búsqueda a minúsculas para una comparación insensible a mayúsculas
    const searchArea = searchInput.toLowerCase().trim();

    // Filtramos la lista de usuarios
    return value.filter(texto =>
      texto.area.nombre.toLowerCase().includes(searchArea)
    );
  }

}

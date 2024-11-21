import { Pipe, PipeTransform } from '@angular/core';
import { TextoNotUndefined } from '../models/list-textos.model';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(value: TextoNotUndefined[], searchInput: string): TextoNotUndefined[] {
    if (!value || value.length === 0) {
      return []; // Si no hay datos, retorna una lista vacía
    }

    if (!searchInput || searchInput.trim() === '') {
      return value; // Si no hay texto de búsqueda, retorna la lista completa
    }

    // Convertimos el texto de búsqueda a minúsculas para una comparación insensible a mayúsculas
    const searchText = searchInput.toLowerCase().trim();

    // Filtramos la lista de usuarios
    return value.filter(texto =>
      texto.titulo.toLowerCase().includes(searchText)
    );
  }

}

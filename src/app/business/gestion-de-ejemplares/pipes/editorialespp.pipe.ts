import { Pipe, PipeTransform } from '@angular/core';
import { Editorial, Texto } from '../models/list-text.model';

@Pipe({
  name: 'editorialespp',
  standalone: true
})
export class EditorialesppPipe implements PipeTransform {

  transform(value: Texto[], searchInput: string): Texto[] {
    if (!value || value.length === 0) {
      return []; // Si no hay datos, retorna una lista vacía
    }

    if (!searchInput || searchInput.trim() === '') {
      return value; // Si no hay texto de búsqueda, retorna la lista completa
    }

    // Convertimos el texto de búsqueda a minúsculas para una comparación insensible a mayúsculas
    const searchEditorial = searchInput.toLowerCase().trim();

    // Filtramos la lista de usuarios
    return value.filter(texto =>
      texto.editorial.nombre.toLowerCase().includes(searchEditorial)
    );
  }

}

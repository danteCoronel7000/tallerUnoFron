import { Pipe, PipeTransform } from '@angular/core';
import { usuario } from '../models/rol-user.model';

@Pipe({
  name: 'searchusuario',
  standalone: true
})
export class SearchusuarioPipe implements PipeTransform {

  transform(value: usuario[], searchInput: string): usuario[] {
    if (!value || value.length === 0) {
      return []; // Si no hay datos, retorna una lista vacía
    }

    if (!searchInput || searchInput.trim() === '') {
      return value; // Si no hay texto de búsqueda, retorna la lista completa
    }

    // Convertimos el texto de búsqueda a minúsculas para una comparación insensible a mayúsculas
    const searchText = searchInput.toLowerCase().trim();

    // Filtramos la lista de usuarios
    return value.filter(user =>
      user.username.toLowerCase().includes(searchText)
    );
  }

}

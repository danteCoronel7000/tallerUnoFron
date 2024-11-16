import { Pipe, PipeTransform } from '@angular/core';
import { Menu } from '../models/list-menu-rol.model';

@Pipe({
  name: 'searchmenu',
  standalone: true
})
export class SearchmenuPipe implements PipeTransform {

  transform(value: Menu[], searchInput: string): Menu[] {
    if (!value || value.length === 0) {
      return []; // Si no hay datos, retorna una lista vacía
    }

    if (!searchInput || searchInput.trim() === '') {
      return value; // Si no hay texto de búsqueda, retorna la lista completa
    }

    // Convertimos el texto de búsqueda a minúsculas para una comparación insensible a mayúsculas
    const searchText = searchInput.toLowerCase().trim();

    // Filtramos la lista de usuarios
    return value.filter(menu =>
      menu.nombre.toLowerCase().includes(searchText)
    );
  }

}

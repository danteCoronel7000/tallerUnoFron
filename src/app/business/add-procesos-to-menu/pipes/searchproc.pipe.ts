import { Pipe, PipeTransform } from '@angular/core';
import { proceso } from '../models/list-menus-procesos.model';

@Pipe({
  name: 'searchproc',
  standalone: true
})
export class SearchprocPipe implements PipeTransform {

  transform(value: proceso[], searchInput: string): proceso[] {
    if (!value || value.length === 0) {
      return []; // Si no hay datos, retorna una lista vacía
    }

    if (!searchInput || searchInput.trim() === '') {
      return value; // Si no hay texto de búsqueda, retorna la lista completa
    }

    // Convertimos el texto de búsqueda a minúsculas para una comparación insensible a mayúsculas
    const searchText = searchInput.toLowerCase().trim();

    // Filtramos la lista de usuarios
    return value.filter(proceso =>
      proceso.nombre.toLowerCase().includes(searchText)
    );
  }

}

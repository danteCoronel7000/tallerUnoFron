import { Pipe, PipeTransform } from '@angular/core';
import { MDevolucion } from '../models/mdevolucion.model';

@Pipe({
  name: 'searchnprest',
  standalone: true
})
export class SearchnprestPipe implements PipeTransform {

  transform(value: MDevolucion[], searchInput: string): MDevolucion[] {
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
      texto.id_mdevolucion.toString().includes(searchText)
    );
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { MDevolucion } from '../models/devolucion.model';

@Pipe({
  name: 'searchestudiant',
  standalone: true
})
export class SearchestudiantPipe implements PipeTransform {

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
    return value.filter(mdev =>
      mdev.reserva.persona.nombre.toLowerCase().includes(searchText) ||
      mdev.reserva.persona.ap.toLowerCase().includes(searchText) ||
      mdev.reserva.persona.am.toLowerCase().includes(searchText)||
      mdev.mprestamo.realiza.persona.nombre.toLowerCase().includes(searchText)||
      mdev.mprestamo.realiza.persona.ap.toLowerCase().includes(searchText)||
      mdev.mprestamo.realiza.persona.am.toLowerCase().includes(searchText)
    );
  }

}

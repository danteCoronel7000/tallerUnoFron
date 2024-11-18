import { Pipe, PipeTransform } from '@angular/core';
import { Texto, Tipo } from '../models/list-text.model';

@Pipe({
  name: 'tipospp',
  standalone: true
})
export class TiposppPipe implements PipeTransform {

  transform(value: Texto[], searchInput: string): Texto[] {
    if (!value || value.length === 0) {
      return []; // Si no hay datos, retorna una lista vacía
    }

    if (!searchInput || searchInput.trim() === '') {
      return value; // Si no hay texto de búsqueda, retorna la lista completa
    }

    // Filtramos la lista de usuarios
    if(searchInput == "impreso"){
      return value.filter(texto =>
        texto.url == null);
    }else{
    return value.filter(texto =>
      texto.url != null);
    }
  }

}

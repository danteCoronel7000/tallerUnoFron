import { Pipe, PipeTransform } from '@angular/core';
import { rolNotUndefined } from '../models/list-roles.model';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(value:  rolNotUndefined[], searchInput: string){
    //operador ternario
    const query = searchInput?.trim().toLowerCase() || '';
    return value.filter(rol => rol.nombre.toLowerCase().includes(query));
  }

}

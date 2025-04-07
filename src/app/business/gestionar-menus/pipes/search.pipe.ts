import { Pipe, PipeTransform } from '@angular/core';
import { menuNotUndefined } from '../models/list-menus.model';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(value:  menuNotUndefined[], searchInput: string){
    //operador ternario
    console.log(searchInput)
    //si es que existe sercharInput?.......  lo convertimos a minusculas(searchInput.toLocaleLowerCase()), sino lo dejamos como un string vacio asi nos aseguramos de que por lo menos haya un valor vacio
    const query = searchInput?.trim().toLowerCase() || '';
    return value.filter(menu => menu.nombre.toLowerCase().includes(query));
  }

}

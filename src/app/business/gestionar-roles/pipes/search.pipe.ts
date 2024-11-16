import { Pipe, PipeTransform } from '@angular/core';
import { rolNotUndefined } from '../models/list-roles.model';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(value:  rolNotUndefined[], searchInput: string){
    //operador ternario
    console.log(searchInput)
    //si es que existe sercharInput?.......  lo convertimos a minusculas(searchInput.toLocaleLowerCase()), sino lo dejamos como un string vacio asi nos aseguramos de que por lo menos haya un valor vacio
    searchInput = searchInput ? searchInput.toLowerCase() : ' ';
    return searchInput ? value.filter(rol => rol.nombre.toLowerCase().includes(searchInput)) : value;
  }

}

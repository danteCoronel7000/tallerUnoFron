import { Pipe, PipeTransform } from '@angular/core';
import { proceso } from '../models/list-menus-procesos.model';

@Pipe({
  name: 'asignoasig',
  standalone: true
})
export class AsignoasigPipe implements PipeTransform {

  transform(value: proceso[], estadoAsig: string): proceso[] {
    console.log('estado del asig desde en pipe:', estadoAsig);
    // Si el estadoTexto es 2, retorna toda la lista sin filtrar
    if (estadoAsig == '2') {
        return value;
    }
    // Si estadoTexto es diferente de 2, filtra los textos donde el estado coincida con estadoTexto
    if(estadoAsig == '1'){
    return value.filter(rol => rol.asig > 0);
    }

    if(estadoAsig == '0'){
    return value.filter(rol => rol.asig == 0);
    }

    return value
}


}

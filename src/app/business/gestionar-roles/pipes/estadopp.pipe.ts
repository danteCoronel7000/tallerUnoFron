import { Pipe, PipeTransform } from '@angular/core';
import { rolNotUndefined } from '../models/list-roles.model';

@Pipe({
  name: 'estadopp',
  standalone: true
})
export class EstadoppPipe implements PipeTransform {

  transform(value: rolNotUndefined[], estadoRol: number): rolNotUndefined[] {
    console.log('estado texto desde en pipe:', estadoRol);
    // Si el estadoTexto es 2, retorna toda la lista sin filtrar
    if (estadoRol == 2) {
        return value;
    }
    // Si estadoTexto es diferente de 2, filtra los textos donde el estado coincida con estadoTexto
    return value.filter(rol => rol.estado == estadoRol);
}


}

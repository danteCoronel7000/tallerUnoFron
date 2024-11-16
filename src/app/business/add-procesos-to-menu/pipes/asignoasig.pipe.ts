import { Pipe, PipeTransform } from '@angular/core';
import { proceso } from '../models/list-menus-procesos.model';

@Pipe({
  name: 'asignoasig',
  standalone: true
})
export class AsignoasigPipe implements PipeTransform {

  transform(value: proceso[], estadoProceso: number): proceso[] {
    console.log('estado texto desde en pipe:', estadoProceso);
    // Si el estadoTexto es 2, retorna toda la lista sin filtrar
    if (estadoProceso == 2) {
        return value;
    }
    // Si estadoTexto es diferente de 2, filtra los textos donde el estado coincida con estadoTexto
    return value.filter(texto => texto.estado == estadoProceso);
}


}

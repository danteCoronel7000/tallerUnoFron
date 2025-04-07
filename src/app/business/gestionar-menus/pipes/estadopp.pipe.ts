import { Pipe, PipeTransform } from '@angular/core';
import { menuNotUndefined } from '../models/list-menus.model';

@Pipe({
  name: 'estadopp',
  standalone: true
})
export class EstadoppPipe implements PipeTransform {
  transform(value: menuNotUndefined[], estadMenu: string): menuNotUndefined[] {
    console.log('estado texto desde en pipe:', estadMenu);
    // Si el estadoTexto es 2, retorna toda la lista sin filtrar
    if (estadMenu == '2') {
        return value;
    }
    const estadoMenu = Number(estadMenu);
    // Si estadoTexto es diferente de 2, filtra los textos donde el estado coincida con estadoTexto
    return value.filter(menu => menu.estado == estadoMenu);
}


}

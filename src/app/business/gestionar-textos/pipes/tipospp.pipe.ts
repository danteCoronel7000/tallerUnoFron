import { Pipe, PipeTransform } from '@angular/core';
import { Tipo } from '../models/list-textos.model';

@Pipe({
  name: 'tipospp',
  standalone: true
})
export class TiposppPipe implements PipeTransform {

  transform(value: Tipo[], tipoSelect: string): Tipo[] {
    console.log('tipo  seleccionda mostrado desde el pipe:', tipoSelect);
    // Si estadoTexto es diferente de 2, filtra los textos donde el estado coincida con estadoTexto
    return value.filter(tipo => tipo.nombre == tipoSelect);
}

}

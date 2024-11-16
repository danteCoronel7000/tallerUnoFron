import { Pipe, PipeTransform } from '@angular/core';
import { Area, TextoNotUndefined } from '../models/list-textos.model';

@Pipe({
  name: 'areaspp',
  standalone: true
})
export class AreasppPipe implements PipeTransform {

  transform(value: TextoNotUndefined[], areaSelect: string): TextoNotUndefined[] {
    console.log('area  seleccionda mostrado desde el pipe:', areaSelect);
    if(!areaSelect){
      return value;
    }
    // Si estadoTexto es diferente de 2, filtra los textos donde el estado coincida con estadoTexto
    return value.filter(texto => texto.area.nombre == areaSelect);
}

}

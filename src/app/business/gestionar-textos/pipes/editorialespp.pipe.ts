import { Pipe, PipeTransform } from '@angular/core';
import { Editorial, TextoNotUndefined } from '../models/list-textos.model';

@Pipe({
  name: 'editorialespp',
  standalone: true
})
export class EditorialesppPipe implements PipeTransform {

  transform(value: TextoNotUndefined[], editorialSelect: string): TextoNotUndefined[] {
    console.log('editorial  seleccionda mostrado desde el pipe:', editorialSelect);
    // Si no hay un valor válido en editorialSelect, retorna la lista completa
    if (!editorialSelect) {
      return value;
  }
    // Si estadoTexto es diferente de 2, filtra los textos donde el estado coincida con estadoTexto
    return value.filter(texto => texto.editorial.nombre == editorialSelect);
}

}

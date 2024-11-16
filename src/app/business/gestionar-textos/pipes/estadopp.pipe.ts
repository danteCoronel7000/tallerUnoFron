import { Pipe, PipeTransform } from '@angular/core';
import { TextoNotUndefined } from '../models/list-textos.model';

@Pipe({
  name: 'estadopp',
  standalone: true
})
export class EstadoppPipe implements PipeTransform {

  transform(value: TextoNotUndefined[], estadoTexto: number): TextoNotUndefined[] {
    console.log('estado texto desde en pipe:', estadoTexto);
    // Si el estadoTexto es 2, retorna toda la lista sin filtrar
    if (estadoTexto == 2) {
        return value;
    }
    // Si estadoTexto es diferente de 2, filtra los textos donde el estado coincida con estadoTexto
    return value.filter(texto => texto.estado == estadoTexto);
}

}

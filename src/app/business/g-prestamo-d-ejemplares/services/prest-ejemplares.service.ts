import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DetPrestamoDTO, MPrestamo } from '../models/list-prestamos.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrestEjemplaresService {

  private urlMprestamo = 'http://localhost:9090/api/mprestamo/all';
  private urlDetPrestDTO = 'http://localhost:9090/api/detprestamo/filtrarPorIdPrestamo';

  openEjemplaresList = signal<boolean>(false);

  private idSeleccionado = new BehaviorSubject<number>(0);
  idSeleccionado$ = this.idSeleccionado.asObservable();

  constructor(private httpClient: HttpClient) { }

  openListEjemplares() {
    this.openEjemplaresList.set(true);
  }

  setIdParaListarEjemplar(id: number) {
    this.idSeleccionado.next(id);
}

    
  getMPrestamo(): Observable<MPrestamo[]> {
    return this.httpClient.get<MPrestamo[]>(this.urlMprestamo);
}

getDetPrestamoDto(id : number): Observable<DetPrestamoDTO[]> {
  return this.httpClient.get<DetPrestamoDTO[]>(`${this.urlDetPrestDTO}/${id}`);
}

}

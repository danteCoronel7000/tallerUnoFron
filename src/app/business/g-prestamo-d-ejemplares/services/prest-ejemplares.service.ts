import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DetPrestamoDTO, EjemplarDtoPPrestamos, MPrestamo, MPrestamoCrear } from '../models/list-prestamos.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrestEjemplaresService {

  private urlMprestamo = `${environment.API_URL}/api/mprestamo/all`;
  private apiUrlCrear = `${environment.API_URL}/api/mprestamo`;
  private urlejemplarPPdto = `${environment.API_URL}/api/ejemplares/allDto`;
  private urlDetPrestDTO = `${environment.API_URL}/api/detprestamo/filtrarPorIdPrestamo`;

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

getEjemplarDtoPP(): Observable<EjemplarDtoPPrestamos[]> {
  return this.httpClient.get<EjemplarDtoPPrestamos[]>(this.urlejemplarPPdto);
}

getDetPrestamoDto(id : number): Observable<DetPrestamoDTO[]> {
  return this.httpClient.get<DetPrestamoDTO[]>(`${this.urlDetPrestDTO}/${id}`);
}

createMprestamo(dto: MPrestamoCrear): Observable<any> {
  return this.httpClient.post<any>(`${this.apiUrlCrear}/crear`, dto);
}

}

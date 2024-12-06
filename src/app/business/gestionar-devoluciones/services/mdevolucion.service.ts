import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EjemplarPrestamoDTOByidprestamo, MDevolucion } from '../models/mdevolucion.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MdevolucionService {

  private urlMprestamo = 'http://localhost:9090/api/mdevolucion/all';
  private apiUrlbyidprestamo = 'http://localhost:9090/api/detprestamo';
  private apiUrlGD = 'http://localhost:9090/api/detprestamo';

  constructor(private httpClient: HttpClient) { }

  getMDevolucion(): Observable<MDevolucion[]> {
    return this.httpClient.get<MDevolucion[]>(this.urlMprestamo);
}

  /**
   * Obtiene la lista de ejemplares por id de mprestamo.
   * @param idmprestamo ID del mprestamo para filtrar los ejemplares.
   * @returns Observable con la lista de EjemplarPrestamoDTO.
   */
  getEjemplaresByMprestamo(idmprestamo: number): Observable<EjemplarPrestamoDTOByidprestamo[]> {
    const url = `${this.apiUrlbyidprestamo}/${idmprestamo}`;
    return this.httpClient.get<EjemplarPrestamoDTOByidprestamo[]>(url);
  }

  guardarEstadoDevolucion(idMprestamo: number, idEjemplar: number, idmdevolucion: number, idusuario: number): Observable<any> {
    return this.httpClient.put(`${this.apiUrlGD}/updateEstado/${idMprestamo}/${idEjemplar}/${idmdevolucion}/${idusuario}`, {});
  }
}

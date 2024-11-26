import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EjemplarPrestamoDTOByidprestamo, MDevolucion } from '../models/devolucion.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnuldevolucionService {

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
    return this.httpClient.put(`${this.apiUrlGD}/updateEstadoDev/${idMprestamo}/${idEjemplar}/${idmdevolucion}/${idusuario}`, {});
  }
}

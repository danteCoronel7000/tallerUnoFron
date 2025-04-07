import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EjemplarPrestamoDTOByidprestamo, MDevolucion } from '../models/devolucion.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnuldevolucionService {

  private urlMprestamo = `${environment.API_URL}/api/mdevolucion/all`;
  private apiUrlbyidprestamo = `${environment.API_URL}/api/detprestamo`;
  private apiUrlGD = `${environment.API_URL}/api/detprestamo`;

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

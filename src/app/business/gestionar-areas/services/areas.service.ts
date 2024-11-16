import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AreaNotUndefined, Areas } from '../models/list-areas.model';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  private url_areas = 'http://localhost:9090/api/areas/all'
  private apiUrlSarch = 'http://localhost:9090/api/areas'
  private apiUrlCrear = 'http://localhost:9090/api/areas/crear'
  private apurlobtenerPorId = 'http://localhost:9090/api/areas/obternerPorId'
  private apiUrlActualizar = 'http://localhost:9090/api/areas/actualizar'


  //para recibir el area buscada
  private areasSource = new BehaviorSubject<AreaNotUndefined[]>([]);
  areasSource$ = this.areasSource.asObservable();

  //para seleccionar areas segun el estado
  private estadoSeleccionado = new BehaviorSubject<number>(2);
  estadoSeleccionado$ = this.estadoSeleccionado.asObservable();

  constructor(private httpClient: HttpClient) { }

  //metodo que recibe el estado para filtrar areas segun el tipo de estado
  actualizarEstado(tipo: number) {
    this.estadoSeleccionado.next(tipo);
  }

  habilitarArea(payload: { id_area: number }): Observable<AreaNotUndefined> {
    const url = `http://localhost:9090/api/areas/habilitar`; // Endpoint de actualización
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<AreaNotUndefined>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
  }

  deleteArea(payload: { id_area: number }): Observable<AreaNotUndefined> {
    const url = `http://localhost:9090/api/areas/estado`; // Endpoint de actualización
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<AreaNotUndefined>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
  }

  getAreas(): Observable<AreaNotUndefined[]> {
    return this.httpClient.get<AreaNotUndefined[]>(this.url_areas);
  }


  //metodo que recibe el area buscada
  setAreas(Areas: any[]) {
    this.areasSource.next(Areas);
  }

  // Método para buscar areas por filtro
  searchAreas(xfiltro: string): Observable<AreaNotUndefined[]> {
    // Realiza la solicitud GET con el filtro como parámetro en la URL
    return this.httpClient.get<AreaNotUndefined[]>(`${this.apiUrlSarch}/searchAreasNative/${xfiltro}`);
  }
  //metodo para crear un area
  createArea(area: Areas): Observable<Areas> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<Areas>(this.apiUrlCrear, area, { headers });
  }

  getAreaPorId(id: number): Observable<Areas> {
    return this.httpClient.get<Areas>(`${this.apurlobtenerPorId}/${id}`);
  }


  // Método para actualizar persona
  actualizarArea(formData: FormData): Observable<AreaNotUndefined> {
    // No necesitas recrear el FormData aquí, ya viene del componente
    console.log('form data servicio actualizar:', formData);

    // Hacer la solicitud HTTP POST al backend
    return this.httpClient.post<AreaNotUndefined>(this.apiUrlActualizar, formData);
  }
}

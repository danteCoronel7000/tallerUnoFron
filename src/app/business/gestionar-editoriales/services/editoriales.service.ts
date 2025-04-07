import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { editorial, editorialNotUndefined } from '../models/list-editoriales.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditorialesService {

  private url_editoriales = `${environment.API_URL}/api/editoriales/all`
  private apiUrlSarch = `${environment.API_URL}/api/editoriales`
  private apiUrlCrear = `${environment.API_URL}/api/editoriales/crear`
  private apurlobtenerPorId = `${environment.API_URL}/api/editoriales/obternerPorId`
  private apiUrlActualizar = `${environment.API_URL}/api/editoriales/actualizar`


  //para recibir el area buscada
  private editorialSource = new BehaviorSubject<editorialNotUndefined[]>([]);
  editorialSource$ = this.editorialSource.asObservable();

  //para seleccionar areas segun el estado
  private estadoSeleccionado = new BehaviorSubject<number>(2);
  estadoSeleccionado$ = this.estadoSeleccionado.asObservable();

  constructor(private httpClient: HttpClient) { }

  //metodo que recibe el estado para filtrar areas segun el tipo de estado
  actualizarEstado(tipo: number) {
    this.estadoSeleccionado.next(tipo);
  }

  habilitaEditorial(payload: { id_editorial: number }): Observable<editorialNotUndefined> {
    const url = `${environment.API_URL}/api/editoriales/habilitar`; // Endpoint de actualización
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<editorialNotUndefined>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
  }

  deleteEditorial(payload: { id_editorial: number }): Observable<editorialNotUndefined> {
    const url = `${environment.API_URL}/api/editoriales/estado`; // Endpoint de actualización
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<editorialNotUndefined>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
  }

  getEditorial(): Observable<editorialNotUndefined[]> {
    return this.httpClient.get<editorialNotUndefined[]>(this.url_editoriales);
  }


  //metodo que recibe el area buscada
  setEditorial(editoriales: any[]) {
    this.editorialSource.next(editoriales);
  }

  // Método para buscar areas por filtro
  searchEditoriales(xfiltro: string): Observable<editorialNotUndefined[]> {
    // Realiza la solicitud GET con el filtro como parámetro en la URL
    return this.httpClient.get<editorialNotUndefined[]>(`${this.apiUrlSarch}/searchEditorialesNative/${xfiltro}`);
  }
  //metodo para crear un area
  createEditorial(editorial: editorial): Observable<editorial> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<editorial>(this.apiUrlCrear, editorial, { headers });
  }

  getEditorialPorId(id: number): Observable<editorial> {
    return this.httpClient.get<editorial>(`${this.apurlobtenerPorId}/${id}`);
  }


  // Método para actualizar persona
  actualizarEditorial(formData: FormData): Observable<editorialNotUndefined> {
    // No necesitas recrear el FormData aquí, ya viene del componente
    console.log('form data servicio actualizar:', formData);

    // Hacer la solicitud HTTP POST al backend
    return this.httpClient.post<editorialNotUndefined>(this.apiUrlActualizar, formData);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { editorial, editorialNotUndefined } from '../models/list-editoriales.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditorialesService {

  private url_editoriales = 'http://localhost:9090/api/editoriales/all'
  private apiUrlSarch = 'http://localhost:9090/api/editoriales'
  private apiUrlCrear = 'http://localhost:9090/api/editoriales/crear'
  private apurlobtenerPorId = 'http://localhost:9090/api/editoriales/obternerPorId'
  private apiUrlActualizar = 'http://localhost:9090/api/editoriales/actualizar'


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
    const url = `http://localhost:9090/api/editoriales/habilitar`; // Endpoint de actualización
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<editorialNotUndefined>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
  }

  deleteEditorial(payload: { id_editorial: number }): Observable<editorialNotUndefined> {
    const url = `http://localhost:9090/api/editoriales/estado`; // Endpoint de actualización
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

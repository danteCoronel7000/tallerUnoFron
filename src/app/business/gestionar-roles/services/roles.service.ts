import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { rol, rolNotUndefined } from '../models/list-roles.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private urlRoles = 'http://localhost:9090/api/roles/all';
private apiUrlSarch = 'http://localhost:9090/api/roles';
private apiUrlCrear = 'http://localhost:9090/api/roles/crear';
private apurlobtenerPorId = 'http://localhost:9090/api/roles/obternerPorId';
private apiUrlActualizar = 'http://localhost:9090/api/roles/actualizar';

//para recibir el rol buscado
private rolSource = new BehaviorSubject<rolNotUndefined[]>([]);
rolSource$ = this.rolSource.asObservable();

//para seleccionar roles segun el estado
private estadoSeleccionado = new BehaviorSubject<number>(2);
estadoSeleccionado$ = this.estadoSeleccionado.asObservable();

constructor(private httpClient: HttpClient) { }

//metodo que recibe el estado para filtrar roles segun el tipo de estado
actualizarEstado(tipo: number) {
  this.estadoSeleccionado.next(tipo);
}

habilitaRol(payload: { id_rol: number }): Observable<rolNotUndefined> {
  const url = `http://localhost:9090/api/roles/habilitar`; // Endpoint de actualización
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.httpClient.post<rolNotUndefined>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
}

deleteRol(payload: { id_rol: number }): Observable<rolNotUndefined> {
  const url = `http://localhost:9090/api/roles/estado`; // Endpoint de actualización
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.httpClient.post<rolNotUndefined>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
}

getRol(): Observable<rolNotUndefined[]> {
  return this.httpClient.get<rolNotUndefined[]>(this.urlRoles);
}

//metodo que recibe el rol buscado
setRol(roles: any[]) {
  this.rolSource.next(roles);
}

// Método para buscar roles por filtro
searchRoles(xfiltro: string): Observable<rolNotUndefined[]> {
  // Realiza la solicitud GET con el filtro como parámetro en la URL
  return this.httpClient.get<rolNotUndefined[]>(`${this.apiUrlSarch}/searchRolesNative/${xfiltro}`);
}

//metodo para crear un rol
createRol(rol: rol): Observable<rol> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.httpClient.post<rol>(this.apiUrlCrear, rol, { headers });
}

getRolPorId(id: number): Observable<rol> {
  return this.httpClient.get<rol>(`${this.apurlobtenerPorId}/${id}`);
}

// Método para actualizar rol
actualizarRol(formData: FormData): Observable<rolNotUndefined> {
  // No necesitas recrear el FormData aquí, ya viene del componente
  console.log('form data servicio actualizar:', formData);

  // Hacer la solicitud HTTP POST al backend
  return this.httpClient.post<rolNotUndefined>(this.apiUrlActualizar, formData);
}
}

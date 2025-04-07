import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { rol, rolNotUndefined } from '../models/list-roles.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private urlRoles = `${environment.API_URL}/api/roles/all`;
private apiUrlSarch = `${environment.API_URL}/api/roles`;
private apiUrlCrear = `${environment.API_URL}/api/roles/crear`;
private apurlobtenerPorId = `${environment.API_URL}/api/roles/obternerPorId`;
private apiUrlActualizar = `${environment.API_URL}/api/roles/actualizar`;


constructor(private httpClient: HttpClient) { }

habilitaRol(payload: { id_rol: number }): Observable<rolNotUndefined> {
  const url = `${environment.API_URL}/api/roles/habilitar`; // Endpoint de actualización
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.httpClient.post<rolNotUndefined>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
}

deleteRol(payload: { id_rol: number }): Observable<rolNotUndefined> {
  const url = `${environment.API_URL}/api/roles/estado`; // Endpoint de actualización
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.httpClient.post<rolNotUndefined>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
}

getRol(): Observable<rolNotUndefined[]> {
  return this.httpClient.get<rolNotUndefined[]>(this.urlRoles);
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

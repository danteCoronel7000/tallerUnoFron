import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { rol, usuario, UsuarioAll } from '../models/rol-user.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolToUsuarioService {

  private baseUrlAdd = `${environment.API_URL}/api/usuarios`;
private url_usuarios = `${environment.API_URL}/api/usuarios/all`;
private url_roles = `${environment.API_URL}/api/roles/allAsig`;
private apiUrlObtenerPorId = `${environment.API_URL}/api/usuarios/obternerPorId`;
private url_rolesfiltrados = `${environment.API_URL}/api/usuarios/filtrarRoles`;
// Para seleccionar textos según el estado
private estadoSeleccionado = new BehaviorSubject<number>(2);      
estadoSeleccionado$ = this.estadoSeleccionado.asObservable();

constructor(private http: HttpClient) { }

actualizarEstado(id: number) {
  console.log('id del usuario actualizado, mostrado desde el servicio: ', id);
  this.estadoSeleccionado.next(id);
}

/**
 * Añade roles a un usuario.
 * @param usuarioId - ID del usuario al que se añadirán los roles.
 * @param roles - Lista de IDs de roles a añadir.
 * @returns Observable con el usuario actualizado.
 */
addRolesToUsuario(usuarioId: number, roles: number[]): Observable<any> {
  const url = `${this.baseUrlAdd}/addRolesAUnUsuario/${usuarioId}`;
  const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  // Convertir los roles a JSON
  const body = new HttpParams().set('roles', JSON.stringify(roles));

  return this.http.post<any>(url, body.toString(), { headers });
}

getUsuarios(): Observable<usuario[]> {
  return this.http.get<usuario[]>(this.url_usuarios);
}

getRoles(): Observable<rol[]> {
  return this.http.get<rol[]>(this.url_roles);
}

getUsuariosPorId(id: number): Observable<UsuarioAll> {
  return this.http.get<UsuarioAll>(`${this.apiUrlObtenerPorId}/${id}`);
}


getRolesFiltrados(id: number, filtro: string): Observable<rol[]> {
  return this.http.get<rol[]>(`${this.url_rolesfiltrados}/${id}/${filtro}`);
}

}

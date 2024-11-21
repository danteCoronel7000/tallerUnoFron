import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { rol, usuario, UsuarioAll } from '../models/rol-user.model';

@Injectable({
  providedIn: 'root'
})
export class RolToUsuarioService {

  private baseUrlAdd = 'http://localhost:9090/api/usuarios';
private url_usuarios = 'http://localhost:9090/api/usuarios/all';
private url_roles = 'http://localhost:9090/api/roles/allAsig';
private apiUrlObtenerPorId = 'http://localhost:9090/api/usuarios/obternerPorId';
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

}

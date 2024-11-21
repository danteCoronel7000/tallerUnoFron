import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Menu, Rol, RolAll } from '../models/list-menu-rol.model';

@Injectable({
  providedIn: 'root'
})
export class MenuRolService {

  private baseUrlAdd = 'http://localhost:9090/api/roles';
private url_roles = 'http://localhost:9090/api/roles/all';
private url_menus = 'http://localhost:9090/api/menus/alldto';
private apiUrlObtenerPorId = 'http://localhost:9090/api/roles/obternerPorId';
// Para seleccionar textos según el estado
private estadoSeleccionado = new BehaviorSubject<number>(2);
estadoSeleccionado$ = this.estadoSeleccionado.asObservable();


constructor(private http: HttpClient) { }

actualizarEstado(id: number) {
  console.log('id del rol actualizado, mostrado desde el servicio: ', id)
  this.estadoSeleccionado.next(id);
}

/**
 * Añade menus a un rol.
 * @param rolId - ID del rol al que se añadirán los menus.
 * @param menus - Lista de IDs de menus a añadir.
 * @returns Observable con el rol actualizado.
 */
addMenusToRol(rolId: number, menus: number[]): Observable<any> {
  const url = `${this.baseUrlAdd}/addMenusAUnRol/${rolId}`;
  const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  // Convertir los menus a JSON
  const body = new HttpParams().set('menus', JSON.stringify(menus));

  return this.http.post<any>(url, body.toString(), { headers });
}

getRoles(): Observable<Rol[]> {
  return this.http.get<Rol[]>(this.url_roles);
}

getMenus(): Observable<Menu[]> {
  return this.http.get<Menu[]>(this.url_menus);
}

getRolesPorId(id: number): Observable<RolAll> {
  return this.http.get<RolAll>(`${this.apiUrlObtenerPorId}/${id}`);
}

}

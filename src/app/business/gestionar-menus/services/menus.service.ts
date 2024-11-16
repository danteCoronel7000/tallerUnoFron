import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { menu, menuNotUndefined } from '../models/list-menus.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  private urlMenus = 'http://localhost:9090/api/menus/all';
  private apiUrlSarch = 'http://localhost:9090/api/menus';
  private apiUrlCrear = 'http://localhost:9090/api/menus/crear';
  private apurlobtenerPorId = 'http://localhost:9090/api/menus/obternerPorId';
  private apiUrlActualizar = 'http://localhost:9090/api/menus/actualizar';


  //para recibir el menu buscado
  private menuSource = new BehaviorSubject<menuNotUndefined[]>([]);
  menuSource$ = this.menuSource.asObservable();

  //para seleccionar menus segun el estado
  private estadoSeleccionado = new BehaviorSubject<number>(2);
  estadoSeleccionado$ = this.estadoSeleccionado.asObservable();

  constructor(private httpClient: HttpClient) { }

  //metodo que recibe el estado para filtrar menus segun el tipo de estado
  actualizarEstado(tipo: number) {
    this.estadoSeleccionado.next(tipo);
  }

  habilitaMenu(payload: { id_menu: number }): Observable<menuNotUndefined> {
    const url = `http://localhost:9090/api/menus/habilitar`; // Endpoint de actualización
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<menuNotUndefined>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
  }

  deleteMenu(payload: { id_menu: number }): Observable<menuNotUndefined> {
    const url = `http://localhost:9090/api/menus/estado`; // Endpoint de actualización
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<menuNotUndefined>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
  }

  getMenu(): Observable<menuNotUndefined[]> {
    return this.httpClient.get<menuNotUndefined[]>(this.urlMenus);
  }


  //metodo que recibe el menu buscado
  setMenu(menus: any[]) {
    this.menuSource.next(menus);
  }

  // Método para buscar menus por filtro
  searchMenus(xfiltro: string): Observable<menuNotUndefined[]> {
    // Realiza la solicitud GET con el filtro como parámetro en la URL
    return this.httpClient.get<menuNotUndefined[]>(`${this.apiUrlSarch}/searchMenusNative/${xfiltro}`);
  }
  
  //metodo para crear un menu
  createMenu(menu: menu): Observable<menu> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<menu>(this.apiUrlCrear, menu, { headers });
  }

  getMenuPorId(id: number): Observable<menu> {
    return this.httpClient.get<menu>(`${this.apurlobtenerPorId}/${id}`);
  }


  // Método para actualizar menu
  actualizarMenu(formData: FormData): Observable<menuNotUndefined> {
    // No necesitas recrear el FormData aquí, ya viene del componente
    console.log('form data servicio actualizar:', formData);

    // Hacer la solicitud HTTP POST al backend
    return this.httpClient.post<menuNotUndefined>(this.apiUrlActualizar, formData);
  }

}

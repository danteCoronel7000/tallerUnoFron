import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { menu, menuNotUndefined } from '../models/list-menus.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  private urlMenus = `${environment.API_URL}/api/menus/all`;
  private apiUrlSarch = `${environment.API_URL}/api/menus`;
  private apiUrlCrear = `${environment.API_URL}/api/menus/crear`;
  private apurlobtenerPorId = `${environment.API_URL}/api/menus/obternerPorId`;
  private apiUrlActualizar = `${environment.API_URL}/api/menus/actualizar`;



  constructor(private httpClient: HttpClient) { }



  habilitaMenu(payload: { id_menu: number }): Observable<menuNotUndefined> {
    const url = `${environment.API_URL}/api/menus/habilitar`; // Endpoint de actualización
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<menuNotUndefined>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
  }

  deleteMenu(payload: { id_menu: number }): Observable<menuNotUndefined> {
    const url = `${environment.API_URL}/api/menus/estado`; // Endpoint de actualización
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<menuNotUndefined>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
  }

  getMenu(): Observable<menuNotUndefined[]> {
    return this.httpClient.get<menuNotUndefined[]>(this.urlMenus);
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

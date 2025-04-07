import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { menu, MenuAll, proceso } from '../models/list-menus-procesos.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcMenuService {

  private baseUrlAdd = `${environment.API_URL}/api/menus`;
  private url_menus = `${environment.API_URL}/api/menus/all`;
  private url_procesos = `${environment.API_URL}/api/menus/alldtoPro`;
  private apiUrlObtenerPorId = `${environment.API_URL}/api/menus/obternerPorId`;
  private url_procesosfiltrados = `${environment.API_URL}/api/procesos/filtrarProcesos`;
  // Para seleccionar textos según el estado
  private estadoSeleccionado = new BehaviorSubject<number>(2);
  estadoSeleccionado$ = this.estadoSeleccionado.asObservable();


  constructor(private http: HttpClient) { }

actualizarEstado(id: number) {
  console.log('id del menu actulizado, mostrado desde el servicio: ',id)
  this.estadoSeleccionado.next(id);
}

  /**
   * Añade procesos a un menú.
   * @param menuId - ID del menú al que se añadirán los procesos.
   * @param procesos - Lista de IDs de procesos a añadir.
   * @returns Observable con el menú actualizado.
   */
  addProcesosToMenu(menuId: number, procesos: number[]): Observable<any> {
    const url = `${this.baseUrlAdd}/addProcesosAUnMenu/${menuId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    // Convertir los procesos a JSON
    const body = new HttpParams().set('procesos', JSON.stringify(procesos));

    return this.http.post<any>(url, body.toString(), { headers });
  }

  getMenus(): Observable<menu[]> {
    return this.http.get<menu[]>(this.url_menus);
  }

  getProcesos(): Observable<proceso[]> {
    return this.http.get<proceso[]>(this.url_procesos);
  }

  getMenusPorId(id: number): Observable<MenuAll> {
    return this.http.get<MenuAll>(`${this.apiUrlObtenerPorId}/${id}`);
}

getProcesosFiltrados(id: number, filtro: string): Observable<proceso[]> {
  return this.http.get<proceso[]>(`${this.url_procesosfiltrados}/${id}/${filtro}`);	
  }

}

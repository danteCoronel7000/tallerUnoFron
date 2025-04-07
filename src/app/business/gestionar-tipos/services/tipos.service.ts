import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tipo, tipoNotUndefined } from '../models/list-tipos.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TiposService {

  private url_tipos = `${environment.API_URL}/api/tipos/all`;
private apiUrlSearch = `${environment.API_URL}/api/tipos`;
private apiUrlCrear = `${environment.API_URL}/api/tipos/crear`;
private apiUrlObtenerPorId = `${environment.API_URL}/api/tipos/obternerPorId`;
private apiUrlActualizar = `${environment.API_URL}/api/tipos/actualizar`;

// Para recibir el tipo buscado
private tipoSource = new BehaviorSubject<tipoNotUndefined[]>([]);
tipoSource$ = this.tipoSource.asObservable();

// Para seleccionar tipos según el estado
private estadoSeleccionado = new BehaviorSubject<number>(2);
estadoSeleccionado$ = this.estadoSeleccionado.asObservable();

constructor(private httpClient: HttpClient) { }

// Método que recibe el estado para filtrar tipos según el tipo de estado
actualizarEstado(tipo: number) {
    this.estadoSeleccionado.next(tipo);
}

habilitarTipo(payload: { id_tipo: number }): Observable<tipoNotUndefined> {
    const url = `${environment.API_URL}/api/tipos/habilitar`; // Endpoint de habilitación
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<tipoNotUndefined>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
}

deleteTipo(payload: { id_tipo: number }): Observable<tipoNotUndefined> {
    const url = `${environment.API_URL}/api/tipos/estado`; // Endpoint de eliminación
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<tipoNotUndefined>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
}

getTipos(): Observable<tipoNotUndefined[]> {
    return this.httpClient.get<tipoNotUndefined[]>(this.url_tipos);
}

// Método que recibe el tipo buscado
setTipo(tipos: any[]) {
    this.tipoSource.next(tipos);
}

// Método para buscar tipos por filtro
searchTipos(xfiltro: string): Observable<tipoNotUndefined[]> {
    // Realiza la solicitud GET con el filtro como parámetro en la URL
    return this.httpClient.get<tipoNotUndefined[]>(`${this.apiUrlSearch}/searchTiposNative/${xfiltro}`);
}

// Método para crear un tipo
createTipo(tipo: tipo): Observable<tipo> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<tipo>(this.apiUrlCrear, tipo, { headers });
}

getTipoPorId(id: number): Observable<tipo> {
    return this.httpClient.get<tipo>(`${this.apiUrlObtenerPorId}/${id}`);
}

// Método para actualizar tipo
actualizarTipo(formData: FormData): Observable<tipoNotUndefined> {
    // No necesitas recrear el FormData aquí, ya viene del componente
    console.log('form data servicio actualizar:', formData);

    // Hacer la solicitud HTTP POST al backend
    return this.httpClient.post<tipoNotUndefined>(this.apiUrlActualizar, formData);
}

}

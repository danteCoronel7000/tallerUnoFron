import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tipo, tipoNotUndefined } from '../models/list-tipos.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TiposService {

  private url_tipos = 'http://localhost:9090/api/tipos/all';
private apiUrlSearch = 'http://localhost:9090/api/tipos';
private apiUrlCrear = 'http://localhost:9090/api/tipos/crear';
private apiUrlObtenerPorId = 'http://localhost:9090/api/tipos/obternerPorId';
private apiUrlActualizar = 'http://localhost:9090/api/tipos/actualizar';

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
    const url = `http://localhost:9090/api/tipos/habilitar`; // Endpoint de habilitación
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<tipoNotUndefined>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
}

deleteTipo(payload: { id_tipo: number }): Observable<tipoNotUndefined> {
    const url = `http://localhost:9090/api/tipos/estado`; // Endpoint de eliminación
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

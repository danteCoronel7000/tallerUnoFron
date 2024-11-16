import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Autor, AutorNotUndefined } from '../models/list-autores.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {

  private url_autores = 'http://localhost:9090/api/autores/all';
private apiUrlSearch = 'http://localhost:9090/api/autores';
private apiUrlCrear = 'http://localhost:9090/api/autores/crear';
private apiUrlObtenerPorId = 'http://localhost:9090/api/autores/obternerPorId';
private apiUrlActualizar = 'http://localhost:9090/api/autores/actualizar';

// Para recibir el autor buscado
private autorSource = new BehaviorSubject<AutorNotUndefined[]>([]);
autorSource$ = this.autorSource.asObservable();

// Para seleccionar autores según el estado
private estadoSeleccionado = new BehaviorSubject<number>(2);
estadoSeleccionado$ = this.estadoSeleccionado.asObservable();

constructor(private httpClient: HttpClient) { }

// Método que recibe el estado para filtrar autores según el tipo de estado
actualizarEstado(autor: number) {
    this.estadoSeleccionado.next(autor);
}

habilitarAutor(payload: { id_autor: number }): Observable<AutorNotUndefined> {
    const url = `http://localhost:9090/api/autores/habilitar`; // Endpoint de habilitación
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<AutorNotUndefined>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
}

deleteAutor(payload: { id_autor: number }): Observable<AutorNotUndefined> {
    const url = `http://localhost:9090/api/autores/estado`; // Endpoint de eliminación
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<AutorNotUndefined>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
}

getAutores(): Observable<AutorNotUndefined[]> {
    return this.httpClient.get<AutorNotUndefined[]>(this.url_autores);
}

// Método que recibe el autor buscado
setAutor(autores: any[]) {
    this.autorSource.next(autores);
}

// Método para buscar autores por filtro
searchAutores(xfiltro: string): Observable<AutorNotUndefined[]> {
    // Realiza la solicitud GET con el filtro como parámetro en la URL
    return this.httpClient.get<AutorNotUndefined[]>(`${this.apiUrlSearch}/searchAutoresNative/${xfiltro}`);
}

// Método para crear un autor
createAutor(autor: Autor): Observable<Autor> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<Autor>(this.apiUrlCrear, autor, { headers });
}

getAutorPorId(id: number): Observable<Autor> {
    return this.httpClient.get<Autor>(`${this.apiUrlObtenerPorId}/${id}`);
}

// Método para actualizar autor
actualizarAutor(formData: FormData): Observable<AutorNotUndefined> {
    // No necesitas recrear el FormData aquí, ya viene del componente
    console.log('form data servicio actualizar:', formData);

    // Hacer la solicitud HTTP POST al backend
    return this.httpClient.post<AutorNotUndefined>(this.apiUrlActualizar, formData);
}

}

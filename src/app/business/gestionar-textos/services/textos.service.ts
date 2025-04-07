import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Area, AutorNotUndefined, Editorial, Texto, TextoBack, TextoNotUndefined, Tipo } from '../models/list-textos.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TextosService {

  private url_textos = `${environment.API_URL}/api/textos/all`;
private apiUrlSearch = `${environment.API_URL}/api/textos`;
private apiUrlCrear = `${environment.API_URL}/api/media/createtext`;
private apiUrlObtenerPorId = `${environment.API_URL}/api/textos/obternerPorId`;
private apiUrlActualizar = `${environment.API_URL}/api/media/updatetext`;
private url_editoriales = `${environment.API_URL}/api/editoriales/all`;
private url_areas = `${environment.API_URL}/api/areas/all`;
private url_tipos = `${environment.API_URL}/api/tipos/all`;
private url_autores = `${environment.API_URL}/api/autores/all`;

//para obtener los autores
getAutores(): Observable<AutorNotUndefined[]> {
    return this.httpClient.get<AutorNotUndefined[]>(this.url_autores);
}
// Para recibir el texto buscado
private textoSource = new BehaviorSubject<TextoNotUndefined[]>([]);
textoSource$ = this.textoSource.asObservable();

// Para seleccionar textos según el estado
private estadoSeleccionado = new BehaviorSubject<number>(2);
estadoSeleccionado$ = this.estadoSeleccionado.asObservable();

constructor(private httpClient: HttpClient) { }

// Método que recibe el estado para filtrar textos según el tipo de estado
actualizarEstado(texto: number) {
    this.estadoSeleccionado.next(texto);
}

habilitarTexto(payload: { id_texto: number }): Observable<TextoNotUndefined> {
    const url = `${environment.API_URL}/api/textos/habilitar`; // Endpoint de habilitación
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<TextoNotUndefined>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
}

deleteTexto(payload: { id_texto: number }): Observable<TextoNotUndefined> {
    const url = `${environment.API_URL}/api/textos/estado`; // Endpoint de eliminación
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<TextoNotUndefined>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
}

getTextos(): Observable<TextoNotUndefined[]> {
    return this.httpClient.get<TextoNotUndefined[]>(this.url_textos);
}

// Método que recibe el texto buscado
setTexto(textos: any[]) {
    this.textoSource.next(textos);
}

// Método para buscar textos por filtro
searchTextos(xfiltro: string): Observable<TextoNotUndefined[]> {
    // Realiza la solicitud GET con el filtro como parámetro en la URL
    return this.httpClient.get<TextoNotUndefined[]>(`${this.apiUrlSearch}/searchTextosNative/${xfiltro}`);
}

// Método para crear un texto
createTexto(formData: FormData): Observable<any> {
    // Hacer la solicitud HTTP POST al backend
    return this.httpClient.post<any>(this.apiUrlCrear, formData);
}

getTextoPorId(id: number): Observable<TextoBack> {
    return this.httpClient.get<TextoBack>(`${this.apiUrlObtenerPorId}/${id}`);
}

// Método para actualizar texto
actualizarTexto(id: number, formData: FormData): Observable<TextoNotUndefined> {
    // Asegúrate de que la URL tenga el `id` del texto a actualizar
    console.log('id impreso desde el servicio: ',id)
    const url = `${this.apiUrlActualizar}/${id}`;
    // Realiza la solicitud PUT al backend con el FormData
    return this.httpClient.put<TextoNotUndefined>(url, formData);
}

getEditorial(): Observable<Editorial[]> {
    return this.httpClient.get<Editorial[]>(this.url_editoriales);
  }

  getAreas(): Observable<Area[]> {
    return this.httpClient.get<Area[]>(this.url_areas);
  }

  getTipos(): Observable<Tipo[]> {
    return this.httpClient.get<Tipo[]>(this.url_tipos);
}

}

import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Area, Autor, Editorial, Ejemplares, Texto, Tipo } from '../models/list-text.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GestEjemplaresService {

  private url_textos = 'http://localhost:9090/api/textos/all';
  private apiUrlObtenerPorId = 'http://localhost:9090/api/textos/obternerPorId';
  private apiUrlObtenerEjemplarPorId= 'http://localhost:9090/api/ejemplares/filtrarPorIdTexto';
  private url_editoriales = 'http://localhost:9090/api/editoriales/all';
  private url_areas = 'http://localhost:9090/api/areas/all';
  private url_tipos = 'http://localhost:9090/api/tipos/all';
  private url_autores = 'http://localhost:9090/api/autores/all';
  
  openEjemplaresList = signal<boolean>(false);
  
  // Para recibir el texto buscado
  private textoSource = new BehaviorSubject<Texto[]>([]);
  textoSource$ = this.textoSource.asObservable();
  
  // Para seleccionar textos según el estado
  private idSeleccionado = new BehaviorSubject<number>(0);
  idSeleccionado$ = this.idSeleccionado.asObservable();
  
  constructor(private httpClient: HttpClient) { }

  openListEjemplares() {
    this.openEjemplaresList.set(true);
  }
  
  // Método que recibe el estado para filtrar textos según el tipo de estado
  setIdParaListarEjemplar(id: number) {
      this.idSeleccionado.next(id);
  }
  
  getTextos(): Observable<Texto[]> {
      return this.httpClient.get<Texto[]>(this.url_textos);
  }
  
  getTextoPorId(id: number): Observable<Texto> {
      return this.httpClient.get<Texto>(`${this.apiUrlObtenerPorId}/${id}`);
  }
  
  getEjemplaresPorTexto(id: number): Observable<Ejemplares[]> {
    return this.httpClient.get<Ejemplares[]>(`${this.apiUrlObtenerEjemplarPorId}/${id}`);
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

  //para obtener los autores
  getAutores(): Observable<Autor[]> {
    return this.httpClient.get<Autor[]>(this.url_autores);
}
}

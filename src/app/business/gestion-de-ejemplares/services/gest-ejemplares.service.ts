import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Area, Autor, CrearEjemplarDTO, Editorial, Ejemplares, Texto, Tipo } from '../models/list-text.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestEjemplaresService {

  private url_textos = `${environment.API_URL}/api/textos/all`;
  private apiUrlObtenerPorId = `${environment.API_URL}/api/textos/obternerPorId`;
  private apiUrlObtenerEjemplarPorId= `${environment.API_URL}/api/ejemplares/filtrarPorIdTexto`;
  private url_editoriales = `${environment.API_URL}/api/editoriales/all`;
  private url_areas = `${environment.API_URL}/api/areas/all`;
  private url_tipos = `${environment.API_URL}/api/tipos/all`;
  private url_autores = `${environment.API_URL}/api/autores/all`;
  private apiUrlCrear = `${environment.API_URL}/api/ejemplares`;
  private apiUrlMaxId = `${environment.API_URL}/api/ejemplares`;
  private apiUrlModIdEjemp = `${environment.API_URL}/api/ejemplares`;
  private apiUrlEjemplarPorId = `${environment.API_URL}/api/ejemplares/obtenerPorId`;
  
  
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

   /**
   * Obtiene el siguiente ID de ejemplares desde el backend.
   * @returns Observable con el siguiente ID.
   */
   obtenerSiguienteId(): Observable<number> {
    return this.httpClient.get<number>(`${this.apiUrlMaxId}/obtenerSiguienteId`);
  }

  //metodo para crear un menu
  createEjemplar(dto: CrearEjemplarDTO): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrlCrear}/crear`, dto);
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

  /**
   * Modificar el ID de un ejemplar.
   * @param currentId ID actual del ejemplar.
   * @param newId Nuevo ID para el ejemplar.
   * @returns Observable con la respuesta del servidor.
   */
  modificarIdEjemplar(id_ejemplar: number | undefined, newcodinv: number | undefined): Observable<string> {
    const body = {
      id_ejemplar: id_ejemplar,
      newcodinv: newcodinv
    };
console.log('desde el servicio: ', body)
    return this.httpClient.put<string>(`${this.apiUrlModIdEjemp}/modificarIdEjemplar`, body);
  }

  getEjemplarPorId(id: number): Observable<Ejemplares> {
    return this.httpClient.get<Ejemplares>(`${this.apiUrlEjemplarPorId}/${id}`);
}

//delete ejemplar de manera logica
deleteEjemplar(payload: { id_ejemplar: number }): Observable<any> {
  const url = `${environment.API_URL}/api/ejemplares/estado`; // Endpoint de eliminación
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.httpClient.post<any>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
}
//habilitar ejemplar
habilitarEjemplar(payload: { id_ejemplar: number }): Observable<any> {
  const url = `${environment.API_URL}/api/ejemplares/habilitar`; // Endpoint de habilitación
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.httpClient.post<any>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
}
}

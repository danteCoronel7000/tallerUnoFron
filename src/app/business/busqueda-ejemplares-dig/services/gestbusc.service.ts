import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area, Autor, CrearEjemplarDTO, Editorial, Ejemplares, Texto, Tipo } from '../models/busqueda.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GestbuscService {

  
  private url_textos = 'http://localhost:9090/api/textos/all';
  private apiUrlObtenerPorId = 'http://localhost:9090/api/textos/obternerPorId';
  private apiUrlObtenerEjemplarPorId= 'http://localhost:9090/api/ejemplares/filtrarPorIdTexto';
  private url_editoriales = 'http://localhost:9090/api/editoriales/all';
  private url_areas = 'http://localhost:9090/api/areas/all';
  private url_tipos = 'http://localhost:9090/api/tipos/all';
  private url_autores = 'http://localhost:9090/api/autores/all';
  private apiUrlCrear = 'http://localhost:9090/api/ejemplares';
  private apiUrlMaxId = 'http://localhost:9090/api/ejemplares';
  private apiUrlModIdEjemp = 'http://localhost:9090/api/ejemplares';
  private apiUrlEjemplarPorId = 'http://localhost:9090/api/ejemplares/obtenerPorId';
  
  

  
  constructor(private httpClient: HttpClient) { }


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
  modificarIdEjemplar(currentId: number | undefined, newId: number | undefined): Observable<string> {
    const body = {
      currentId: currentId,
      newId: newId
    };
console.log('desde el servicio: ', body)
    return this.httpClient.put<string>(`${this.apiUrlModIdEjemp}/modificarIdEjemplar`, body);
  }

  getEjemplarPorId(id: number): Observable<Ejemplares> {
    return this.httpClient.get<Ejemplares>(`${this.apiUrlEjemplarPorId}/${id}`);
}

//delete ejemplar de manera logica
deleteEjemplar(payload: { id_ejemplar: number }): Observable<any> {
  const url = `http://localhost:9090/api/ejemplares/estado`; // Endpoint de eliminación
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.httpClient.post<any>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
}
//habilitar ejemplar
habilitarEjemplar(payload: { id_ejemplar: number }): Observable<any> {
  const url = `http://localhost:9090/api/ejemplares/habilitar`; // Endpoint de habilitación
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.httpClient.post<any>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
}
}

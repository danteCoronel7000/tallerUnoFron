import { Injectable, Signal, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Persona } from '../../users/models/edit-user.model';
import { Personas } from '../models/buscarPersona.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  private url_foto: string = `${environment.API_URL}/api/media/upload`;

  private api_url: string = `${environment.API_URL}/api/media/crear`;

  private api_url_editar: string = `${environment.API_URL}/api/media/actualizar`;

  private baseUrl = `${environment.API_URL}/api/personas`;

  private apiUrlSarch = `${environment.API_URL}/api/personas`;


  private valorSource = new BehaviorSubject<number>(0); // Inicializa el valor
  valorActual = this.valorSource.asObservable();

  //para recibir la persona buscada
  private personasSource = new BehaviorSubject<any[]>([]);
  personas$ = this.personasSource.asObservable();

  //para recibir el tipo de persona a listar
  private tipoPersonaSubject = new BehaviorSubject<string>('Todos');
  tipoPersona$ = this.tipoPersonaSubject.asObservable();

  //para seleccionar personas segun el estado
  private estadoSeleccionado = new BehaviorSubject<number>(2);
  estadoSeleccionado$ = this.estadoSeleccionado.asObservable();

  constructor(private http: HttpClient) { }
//metodo que recibe el tipo de persona a mostrar en la lista
  cambiarTipoPersona(tipo: string) {
    this.tipoPersonaSubject.next(tipo);
  }

//metodo que recibe el estado de la persona
  actualizarEstado(tipo: number) {
    this.estadoSeleccionado.next(tipo);
  }

//metodo que recibe la persona buscada
  setPersonas(personas: any[]) {
    this.personasSource.next(personas);
  }

    // Método para buscar personas por filtro
    searchPersonas(xfiltro: string): Observable<Personas[]> {
      // Realiza la solicitud GET con el filtro como parámetro en la URL
      return this.http.get<Personas[]>(`${this.apiUrlSarch}/searchPersonasNative/${xfiltro}`);
    }

  //para enviar el id de un componente a otro
  cambiarValor(valor: number) {
    this.valorSource.next(valor); // Cambia el valor para que lo escuchen los componentes suscritos
  }

  // Método para crear persona
  createPersona(formData: FormData): Observable<any> {
    // No necesitas recrear el FormData aquí, ya viene del componente
  
    // Hacer la solicitud HTTP POST al backend
    return this.http.post<any>(this.api_url, formData);
  }

  // Método para actualizar persona
  actualizarPersona(formData: FormData): Observable<any> {
    // No necesitas recrear el FormData aquí, ya viene del componente
    console.log('form data servicio actualizar:', formData);
  
    // Hacer la solicitud HTTP POST al backend
    return this.http.post<any>(this.api_url_editar, formData);
  }

  getPersonaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  getPersonaPorId(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.baseUrl}/${id}`);
  }



  uploadFile(file: File, idPersona: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('id_persona', idPersona.toString());

    const headers = new HttpHeaders().set('enctype', 'multipart/form-data');
    return this.http.post(this.url_foto, formData, { headers });
  }
}

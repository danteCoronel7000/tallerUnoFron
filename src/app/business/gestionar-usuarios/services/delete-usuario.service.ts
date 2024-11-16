import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../models/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class DeleteUsuarioService {

  private apiUrl: string = 'http://localhost:9090/api/personas';

  constructor(private http: HttpClient) {}

  actualizarPersona(payload: { id_persona: number }): Observable<any> {
    const url = `http://localhost:9090/api/personas/estado`; // Endpoint de actualización
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post<any>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
  }
}
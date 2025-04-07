import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HabilitarUsuarioService {

  private apiUrl: string = `${environment.API_URL}/api/personas`;

  constructor(private http: HttpClient) {}

  habilitarPersona(payload: { id_persona: number }): Observable<any> {
    const url = `${environment.API_URL}/api/personas/habilitar`; // Endpoint de actualización
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post<any>(url, payload, { headers }); // Envía el payload en el cuerpo de la solicitud
  }
}

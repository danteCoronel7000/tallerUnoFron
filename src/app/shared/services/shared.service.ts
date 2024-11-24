import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private url_foto: string = 'http://localhost:9090/api/media';

  constructor(private http: HttpClient) {}

  actualizarFotoPersona(formData: FormData): Observable<{ url: string }> {
    return this.http.put<{ url: string }>(`${this.url_foto}/updatefoto`, formData);
  }
}

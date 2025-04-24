import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private url_foto: string = `${environment.API_URL}/api/media`;

  rolSelect = signal<any>(null);

  updateRolSelect(newRolSelect: any): void {
    this.rolSelect.set(newRolSelect);
  }

  constructor(private http: HttpClient) {}

  actualizarFotoPersona(formData: FormData): Observable<{ url: string }> {
    return this.http.put<{ url: string }>(`${this.url_foto}/updatefoto`, formData);
  }
}

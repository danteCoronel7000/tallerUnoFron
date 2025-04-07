import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) { }

  uploadFile(formData: FormData): Observable<any>{
    return this.http.post(`${environment.API_URL}/api/media/upload`, formData)
  }
}

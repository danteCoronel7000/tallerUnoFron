import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ResponseMessage } from '../models/response-message';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  private apiUrl = `${environment.API_URL}/api/media/upload`; // Cambia la URL según sea necesario

  constructor(private http: HttpClient) {}

  // Método para subir el archivo
  uploadFile(file: File): Observable<ResponseMessage> {
    const formData = new FormData();
    formData.append('file', file); // El campo 'file' debe coincidir con el del backend

    return this.http.post<ResponseMessage>(this.apiUrl, formData).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error.message || 'Error al subir el archivo';
    }

    return throwError(() => new Error(errorMessage));
  }

}
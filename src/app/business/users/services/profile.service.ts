import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'http://localhost:9090/api/usuarios';

  constructor(private http: HttpClient) {}

  updateBookImage(id: number, image:File): Observable<User> {
    const formData = new FormData()
    formData.append('file', image)
    return this.http.put<User>(`${this.apiUrl}/${id}/image`,formData);
  }

  getBookById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createBook(book: User, image:File): Observable<User> {
    const formData = new FormData()
    formData.append('user', new Blob([JSON.stringify(book)], { type: 'application/json' }));
    formData.append('file', image)

    return this.http.post<User>(this.apiUrl, formData);
  }

  updateBook(book: User) {
    return this.http.put(this.apiUrl, book);
  }
}

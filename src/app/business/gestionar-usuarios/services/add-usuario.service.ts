import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Usuarios } from '../models/usuarios.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddUsuarioService {

  private apiUrl = 'http://localhost:9090/api/usuarios'; // URL del backend para usuarios
  
  private modalState = new BehaviorSubject<boolean>(false); // Estado inicial cerrado

  modalState$ = this.modalState.asObservable(); // Observable para que los componentes se suscriban

  idPersona = signal<number>(0);

  constructor(private http: HttpClient) {}

  // Método para crear un usuario asociado a una persona
  crearUsuario(usuario: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(`${this.apiUrl}/crear`, usuario);
  }


  // Método para abrir el modal
  openModal() {
    this.modalState.next(true);
  }

  // Método para cerrar el modal
  closeModal() {
    this.modalState.next(false);
  }

  setIdPersona(id: number) {
    this.idPersona.set(id); // Aquí estableces el valor de idPersona
  }

}

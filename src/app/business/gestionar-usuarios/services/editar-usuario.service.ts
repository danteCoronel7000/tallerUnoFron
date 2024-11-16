import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Usuarios } from '../models/usuarios.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditarUsuarioService {

  
  private apiUrl = 'http://localhost:9090/api/usuarios'; // URL del backend para usuarios
  
  private modalState = new BehaviorSubject<boolean>(false); // Estado inicial cerrado

  modalState$ = this.modalState.asObservable(); // Observable para que los componentes se suscriban

  idUsuario = signal<number>(0);

  private valorSource = new BehaviorSubject<string>(''); // Inicializa el valor
  valorActual = this.valorSource.asObservable();

  //para enviar el id de un componente a otro
  cambiarValorNombre(valor: string) {
    this.valorSource.next(valor); // Cambia el valor para que lo escuchen los componentes suscritos
  }

  constructor(private http: HttpClient) {}

  editarUsuario(usuario: Usuarios): Observable<Usuarios> {
    return this.http.put<Usuarios>(`${this.apiUrl}/editar`, usuario);
  }


  // Método para abrir el modal
  openModal() {
    this.modalState.next(true);
  }

  // Método para cerrar el modal
  closeModal() {
    this.modalState.next(false);
  }

  setIdUsuario(id: number) {
    this.idUsuario.set(id); // Aquí estableces el valor de idPersona
  }
}

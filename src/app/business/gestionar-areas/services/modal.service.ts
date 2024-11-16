import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalState = new BehaviorSubject<boolean>(false); // Estado inicial cerrado

  modalState$ = this.modalState.asObservable(); // Observable para que los componentes se suscriban

  constructor() { }

   // Método para abrir el modal
   openModal() {
    this.modalState.next(true);
  }

  // Método para cerrar el modal
  closeModal() {
    this.modalState.next(false);
  }
}

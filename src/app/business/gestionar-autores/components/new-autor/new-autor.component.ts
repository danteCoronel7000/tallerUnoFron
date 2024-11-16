import { Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Autor } from '../../models/list-autores.model';
import { AutoresService } from '../../services/autores.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-autor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-autor.component.html',
  styleUrl: './new-autor.component.css'
})
export class NewAutorComponent {
  modalService = inject(ModalService);

  isOpen = false;
  
  showModal = false;
  
  autor: Autor = {
    nombre: '',
    estado: 0,
    id_autor: 0,
    ap: '',
    am: '',
    genero: ''
  };
  
  constructor(private autoresService: AutoresService) {
    this.modalService.modalState$.subscribe(state => {
      this.isOpen = state;
    });
  }
  
  onSubmit() {
    this.autoresService.createAutor(this.autor).subscribe({
      next: (response) => {
        console.log('Autor creado:', response);
        this.showSuccessModal();  // Llamada al modal de éxito
        // Puedes agregar aquí una redirección o mensaje de éxito
      },
      error: (error) => {
        console.error('Error al crear el autor:', error);
      }
    });
  }
  
  // Método para mostrar un modal de creado con éxito
  showSuccessModal() {
    this.showModal = true;
    setTimeout(() => {
      this.showModal = false;
      this.close();
    }, 1000); // Oculta el modal después de 1 segundo
  }
  
  close() {
    this.modalService.closeModal();
  }
  
}

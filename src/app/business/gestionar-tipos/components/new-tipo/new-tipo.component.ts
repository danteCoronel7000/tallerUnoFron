import { Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { tipo } from '../../models/list-tipos.model';
import { TiposService } from '../../services/tipos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-tipo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-tipo.component.html',
  styleUrl: './new-tipo.component.css'
})
export class NewTipoComponent {
  modalService = inject(ModalService)

  isOpen = false;

  showModal = false;

  tipo: tipo = {
    nombre: '',
    estado: 0,
    sw: 0
  };

  constructor(private tiposService: TiposService){
    this.modalService.modalState$.subscribe(state => {
      this.isOpen = state;
    });
  }


  onSubmit() {
    this.tiposService.createTipo(this.tipo).subscribe({
      next: (response) => {
        console.log('Editorial creada:', response);
        this.showSuccessModal();  // Llamada al modal de éxito
        // Puedes agregar aquí una redirección o mensaje de éxito
      },
      error: (error) => {
        console.error('Error al crear el área:', error);
      }
    });
  }

  //metodo para mostrar un modal de creado con exito
  showSuccessModal() {
    this.showModal = true;
    setTimeout(() => {
      this.showModal = false;
      this.close();
    }, 1000); // Oculta el modal después de 1 segundos
  }

  close() {
    this.modalService.closeModal();
  }
}

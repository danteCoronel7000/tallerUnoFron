import { Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { editorial } from '../../models/list-editoriales.model';
import { EditorialesService } from '../../services/editoriales.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-editorial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-editorial.component.html',
  styleUrl: './new-editorial.component.css'
})
export class NewEditorialComponent {

  modalService = inject(ModalService)

  isOpen = false;

  showModal = false;

  editorial: editorial = {
    nombre: '',
    estado: 0
  };

  constructor(private editorialesService: EditorialesService){
    this.modalService.modalState$.subscribe(state => {
      this.isOpen = state;
    });
  }


  onSubmit() {
    this.editorialesService.createEditorial(this.editorial).subscribe({
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

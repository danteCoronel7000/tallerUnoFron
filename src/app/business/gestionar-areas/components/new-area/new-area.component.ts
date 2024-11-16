import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Areas } from '../../models/list-areas.model';
import { AreasService } from '../../services/areas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-area',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-area.component.html',
  styleUrl: './new-area.component.css'
})
export class NewAreaComponent {

  modalService = inject(ModalService)

  isOpen = false;

  showModal = false;

  area: Areas = {
    nombre: '',
    estado: 0
  };

  constructor(private areasService: AreasService){
    this.modalService.modalState$.subscribe(state => {
      this.isOpen = state;
    });
  }


  onSubmit() {
    this.areasService.createArea(this.area).subscribe({
      next: (response) => {
        console.log('Área creada:', response);
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

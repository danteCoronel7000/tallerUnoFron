import { Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { RolesService } from '../../services/roles.service';
import { rol } from '../../models/list-roles.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-rol',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-rol.component.html',
  styleUrl: './new-rol.component.css'
})
export class NewRolComponent {
  modalService = inject(ModalService)

  isOpen = false;
  
  showModal = false;
  
  rol: rol = {
    nombre: '',
    estado: 0
  };
  
  constructor(private rolesService: RolesService){
    this.modalService.modalState$.subscribe(state => {
      this.isOpen = state;
    });
  }
  
  onSubmit() {
    this.rolesService.createRol(this.rol).subscribe({
      next: (response) => {
        console.log('Rol creado:', response);
        this.showSuccessModal();  // Llamada al modal de éxito
        // Puedes agregar aquí una redirección o mensaje de éxito
      },
      error: (error) => {
        console.error('Error al crear el rol:', error);
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

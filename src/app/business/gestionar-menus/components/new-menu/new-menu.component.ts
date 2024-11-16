import { Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { menu } from '../../models/list-menus.model';
import { MenusService } from '../../services/menus.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-menu.component.html',
  styleUrl: './new-menu.component.css'
})
export class NewMenuComponent {
  modalService = inject(ModalService)

  isOpen = false;
  
  showModal = false;
  
  menu: menu = {
    nombre: '',
    estado: 0
  };
  
  constructor(private menusService: MenusService){
    this.modalService.modalState$.subscribe(state => {
      this.isOpen = state;
    });
  }
  
  onSubmit() {
    this.menusService.createMenu(this.menu).subscribe({
      next: (response) => {
        console.log('Menu creado:', response);
        this.showSuccessModal();  // Llamada al modal de éxito
        // Puedes agregar aquí una redirección o mensaje de éxito
      },
      error: (error) => {
        console.error('Error al crear el menú:', error);
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

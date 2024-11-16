import { Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-head-roles',
  standalone: true,
  imports: [],
  templateUrl: './head-roles.component.html',
  styleUrl: './head-roles.component.css'
})
export class HeadRolesComponent {
  modalService = inject(ModalService);

  constructor() { }
  
  // Llama al servicio para abrir el modal
  openModal() {
      this.modalService.openModal(); // Abre el modal
  }
}

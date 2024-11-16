import { Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-head-menus',
  standalone: true,
  imports: [],
  templateUrl: './head-menus.component.html',
  styleUrl: './head-menus.component.css'
})
export class HeadMenusComponent {
  modalService = inject(ModalService);

  constructor() { }
  
  // Llama al servicio para abrir el modal
  openModal() {
      this.modalService.openModal(); // Abre el modal
  }
}

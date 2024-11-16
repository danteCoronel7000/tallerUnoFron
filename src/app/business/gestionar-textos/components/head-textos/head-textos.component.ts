import { Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-head-textos',
  standalone: true,
  imports: [],
  templateUrl: './head-textos.component.html',
  styleUrl: './head-textos.component.css'
})
export class HeadTextosComponent {
  modalService = inject(ModalService);

  constructor() { }
  
  // Llama al servicio para abrir el modal
  openModal() {
      this.modalService.openModal(); // Abre el modal
  }
}

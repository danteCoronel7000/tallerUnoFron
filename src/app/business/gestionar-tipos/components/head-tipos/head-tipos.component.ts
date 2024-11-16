import { Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { TiposService } from '../../services/tipos.service';

@Component({
  selector: 'app-head-tipos',
  standalone: true,
  imports: [],
  templateUrl: './head-tipos.component.html',
  styleUrl: './head-tipos.component.css'
})
export class HeadTiposComponent {

  modalService = inject(ModalService);

constructor(private tiposService: TiposService) { }

// Llama al servicio para abrir el modal
openModal() {
  this.modalService.openModal(); // Abre el modal
}

getTipos(): void {
  this.tiposService.getTipos().subscribe(
    (data) => {
      this.tiposService.setTipo(data); // Almacena todas las personas en el servicio
    },
    (error) => {
      console.error('Error al obtener los tipos:', error);
    }
  );
}

buscarTipos(filtro: string): void {
  if (filtro) {
    this.tiposService.searchTipos(filtro).subscribe({
      next: (result) => {
        this.tiposService.setTipo(result); // Actualiza la lista con los resultados de la búsqueda
      },
      error: (error) => {
        console.error('Error al buscar tipos:', error);
      }
    });
  } else {
    // Si el input está vacío, carga todos los tipos
    this.getTipos(); // Vuelve a cargar todos los tipos
  }
}

// Método para obtener el valor del input
getInputValue(event: Event): string {
  const input = event.target as HTMLInputElement; // Convertimos el target a HTMLInputElement
  return input.value; // Retornamos el valor
}

onRadioChange(event: any) {
  const tipo = event.target.value;
  console.log('estado seleccionado: ', tipo);
  this.tiposService.actualizarEstado(tipo);
}


}

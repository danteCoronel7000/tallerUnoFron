import { Component, inject } from '@angular/core';
import { AreasService } from '../../services/areas.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-head-araes',
  standalone: true,
  imports: [],
  templateUrl: './head-areas.component.html',
  styleUrl: './head-areas.component.css'
})
export class HeadAraesComponent {
  modalService = inject(ModalService)

  constructor(private areasService: AreasService) { }

  // Llama al servicio para abrir el modal
 openModal() {
  this.modalService.openModal(); // Abre el modal
}

  getAreas(): void {
    this.areasService.getAreas().subscribe(
      (data) => {
        this.areasService.setAreas(data); // Almacena todas las personas en el servicio
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  buscarAreas(filtro: string): void {
    if (filtro) {
      this.areasService.searchAreas(filtro).subscribe({
        next: (result) => {
          this.areasService.setAreas(result); // Actualiza la lista con los resultados de la búsqueda
        },
        error: (error) => {
          console.error('Error al buscar personas:', error);
        }
      });
    } else {
      // Si el input está vacío, carga todas las personas
      this.getAreas(); // Vuelve a cargar todas las personas
    }
  }

   // Método para obtener el valor del input
   getInputValue(event: Event): string {
    const input = event.target as HTMLInputElement; // Convertimos el target a HTMLInputElement
    return input.value; // Retornamos el valor
  }


  onRadioChange(event: any) {
    const tipo = event.target.value;
    console.log('estado seleccionado: ',tipo)
    this.areasService.actualizarEstado(tipo);
  }

}

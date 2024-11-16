import { Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { EditorialesService } from '../../services/editoriales.service';

@Component({
  selector: 'app-head-editoriales',
  standalone: true,
  imports: [],
  templateUrl: './head-editoriales.component.html',
  styleUrl: './head-editoriales.component.css'
})
export class HeadEditorialesComponent {
  modalService = inject(ModalService)

  constructor(private editorialesService: EditorialesService) { }

  // Llama al servicio para abrir el modal
 openModal() {
  this.modalService.openModal(); // Abre el modal
}

  getEditoriales(): void {
    this.editorialesService.getEditorial().subscribe(
      (data) => {
        this.editorialesService.setEditorial(data); // Almacena todas las personas en el servicio
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  buscarEditoriales(filtro: string): void {
    if (filtro) {
      this.editorialesService.searchEditoriales(filtro).subscribe({
        next: (result) => {
          this.editorialesService.setEditorial(result); // Actualiza la lista con los resultados de la búsqueda
        },
        error: (error) => {
          console.error('Error al buscar personas:', error);
        }
      });
    } else {
      // Si el input está vacío, carga todas las personas
      this.getEditoriales(); // Vuelve a cargar todas las personas
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
    this.editorialesService.actualizarEstado(tipo);
  }
}

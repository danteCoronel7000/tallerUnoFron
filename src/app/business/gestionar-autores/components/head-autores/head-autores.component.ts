import { Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { AutoresService } from '../../services/autores.service';

@Component({
  selector: 'app-head-autores',
  standalone: true,
  imports: [],
  templateUrl: './head-autores.component.html',
  styleUrl: './head-autores.component.css'
})
export class HeadAutoresComponent {
  modalService = inject(ModalService);

  constructor(private autoresService: AutoresService) { }
  
  // Llama al servicio para abrir el modal
  openModal() {
    this.modalService.openModal(); // Abre el modal
  }
  
  getAutores(): void {
    this.autoresService.getAutores().subscribe(
      (data) => {
        this.autoresService.setAutor(data); // Almacena todos los autores en el servicio
      },
      (error) => {
        console.error('Error al obtener los autores:', error);
      }
    );
  }
  
  buscarAutores(filtro: string): void {
    if (filtro) {
      this.autoresService.searchAutores(filtro).subscribe({
        next: (result) => {
          this.autoresService.setAutor(result); // Actualiza la lista con los resultados de la búsqueda
        },
        error: (error) => {
          console.error('Error al buscar autores:', error);
        }
      });
    } else {
      // Si el input está vacío, carga todos los autores
      this.getAutores(); // Vuelve a cargar todos los autores
    }
  }
  
  // Método para obtener el valor del input
  getInputValue(event: Event): string {
    const input = event.target as HTMLInputElement; // Convertimos el target a HTMLInputElement
    return input.value; // Retornamos el valor
  }
  
  onRadioChange(event: any) {
    const autor = event.target.value;
    console.log('estado seleccionado: ', autor);
    this.autoresService.actualizarEstado(autor);
  }
  
}

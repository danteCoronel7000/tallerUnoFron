import { Component, inject } from '@angular/core';
import { ModalFormService } from '../../../users/services/modal-form.service';
import { PersonasService } from '../../services/personas.service';
import { Personas } from '../../models/buscarPersona.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Console } from 'node:console';

@Component({
  selector: 'app-head-usuarios',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './head-usuarios.component.html',
  styleUrl: './head-usuarios.component.css'
})
export class HeadUsuariosComponent {
  modalServie = inject(ModalFormService);
  personasService = inject(PersonasService)

  personas: Personas[] = [];
  filtro: string = ''; // Variable enlazada con el input

  constructor(private authService: AuthService) { }

  openModalNew(): void{
    this.modalServie.openModalNewUser();
  }

  getPersonas(): void {
    this.authService.getPersonas().subscribe(
      (data) => {
        this.personasService.setPersonas(data); // Almacena todas las personas en el servicio
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  buscarPersonas(filtro: string): void {
    if (filtro) {
      // Lógica de búsqueda
      this.personasService.searchPersonas(filtro).subscribe({
        next: (result) => {
          this.personasService.setPersonas(result); // Actualiza la lista con los resultados de la búsqueda
        },
        error: (error) => {
          console.error('Error al buscar personas:', error);
        }
      });
    } else {
      // Si el input está vacío, carga todas las personas
      this.getPersonas(); // Vuelve a cargar todas las personas
    }
  }

   // Método para obtener el valor del input
   getInputValue(event: Event): string {
    const input = event.target as HTMLInputElement; // Convertimos el target a HTMLInputElement
    return input.value; // Retornamos el valor
  }


  // Función para capturar el tipo de personal seleccionado
  onSelectChange(event: Event) {
    const tipo = (event.target as HTMLSelectElement).value;
    this.personasService.cambiarTipoPersona(tipo);
  }

  onRadioChange(event: any) {
    const tipo = event.target.value;
    console.log('estado seleccionado: ',tipo)
    this.personasService.actualizarEstado(tipo);
  }

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CrearEjemplarDTO, Ejemplares, updateIdEjemplar } from '../../models/list-text.model';
import { GestEjemplaresService } from '../../services/gest-ejemplares.service';

@Component({
  selector: 'app-det-ejemplares',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './det-ejemplares.component.html',
  styleUrl: './det-ejemplares.component.css'
})
export class DetEjemplaresComponent {

  p: number = 1;

  listEjemplares: Ejemplares[] = [];

  nombreEjemplar: number = 0;
  id_ejemplar: number = 0;
  currentInv: number = 0;
  idEjemplar: number | undefined = undefined;
  newIdejemplar: number | undefined = undefined;
  selectEstado: string = "2";
  isOpenModalNew: boolean = false;
  isOpenModalEditar: boolean = false;
  showModal: boolean = false;

  ejemplar: Ejemplares = {
    id_ejemplar: 0,
    codinv: 0,
    disponible: 1,
    estado: 1
  }

  ejemplarCreateDTO: CrearEjemplarDTO = {
    ejemplar: this.ejemplar,
    id_texto: 0
  }

  constructor(public ejemplaresService: GestEjemplaresService) {
    this.ejemplaresService.idSeleccionado$.subscribe(
      (valor) => {
        this.ejemplarCreateDTO.id_texto = valor;
        this.getEjemplaresPorIdTexto(valor);
      }
    )
  }

  getEjemplaresPorIdTexto(id: number): void {
    this.ejemplaresService.getEjemplaresPorTexto(id).subscribe(
      (data) => {
        this.listEjemplares = data;
        console.log('constructor', data)
      },
      (error) => {
        console.error('Error al obtener los textos:', error);
      }
    );
  }

  openModalNewEjemplar() {
    this.isOpenModalNew = true;
  }

  closeModalNew() {
    this.isOpenModalNew = false;
  }

  onSubmitNew() {
    this.ejemplaresService.createEjemplar(this.ejemplarCreateDTO).subscribe({
      next: (response) => {
        console.log('ejemplar creado:', response);
        this.showSuccessModal();  // Llamada al modal de éxito
        // Puedes agregar aquí una redirección o mensaje de éxito
        this.closeModalNew();
      },
      error: (error) => {
        console.error('Error al crear el ejemplar:', error);
      }
    });
  }

  openModalEditar() {
    this.isOpenModalEditar = true;
  }

  cargarModalEditar(condinv:number, id_ejemplar: number){
    this.currentInv = condinv;
    this.idEjemplar = id_ejemplar;
  }

  onSubmitEditar() {
    console.log('fgewrtgaefr: ', this.idEjemplar, this.newIdejemplar)
    this.ejemplaresService.modificarIdEjemplar(this.idEjemplar, this.newIdejemplar).subscribe(
      (data) =>{
        console.log('ejemplar creado:', data);
        this.showSuccessModal();  // Llamada al modal de éxito
        this.closeModalEditar();
      },
      (error) => {
        console.error('Error al crear el menú:', error);
      });
    
  }

  closeModalEditar() {
    this.isOpenModalEditar = false;
  }



  showSuccessModal() {
    this.showModal = true;
    setTimeout(() => {
      this.showModal = false;
    }, 1000); // Oculta el modal después de 1 segundo
  }

  deleteEjemplar() {
    const payload = { id_ejemplar: this.id_ejemplar };
    console.log('id_texto desde delete texto: ', this.id_ejemplar);
    this.ejemplaresService.deleteEjemplar(payload).subscribe({
        next: (respuesta) => {
            console.log('ejemplar eliminado:', respuesta);
        },
        error: (error) => {
            console.error('Error al eliminar el texto:', error);
        }
    });
  
    const modal = document.getElementById('popup-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('block');
    }
  }

  habilitarEjemplar() {
    const payload = { id_ejemplar: this.id_ejemplar };
    console.log('id desde habilitar', this.id_ejemplar);
    this.ejemplaresService.habilitarEjemplar(payload).subscribe({
        next: (respuesta) => {
            console.log('ejemplar habilitado:', respuesta);
        },
        error: (error) => {
            console.error('Error al habilitar el texto:', error);
        }
    });

    const modal = document.getElementById('popup-modal-one');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('block');
    }
}

  closeModalDH(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('block');
    }
}


openModalDelete(id: number, nombre: number) {
  this.nombreEjemplar = nombre;
  this.id_ejemplar = id;
  console.log('des boton button open: ', this.nombreEjemplar, this.id_ejemplar)
  const modal = document.getElementById('popup-modal');

  if (modal) {
      modal.classList.add('block');
      modal.classList.remove('hidden');
  }
}

openModalHabilitar(id: number, nombre: number) {
  this.nombreEjemplar = nombre;
  this.id_ejemplar = id;

  const modal = document.getElementById('popup-modal-one');

  if (modal) {
      modal.classList.add('block');
      modal.classList.remove('hidden');
  }
}

}




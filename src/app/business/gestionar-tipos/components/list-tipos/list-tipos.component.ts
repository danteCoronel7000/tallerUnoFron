import { Component, inject } from '@angular/core';
import { tipoNotUndefined } from '../../models/list-tipos.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TiposService } from '../../services/tipos.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { NewTipoComponent } from "../new-tipo/new-tipo.component";
import { ModalService } from '../../services/modal.service';
import { SearchestadoPipe } from '../../pipes/searchestado.pipe';
import { SearchtipoPipe } from '../../pipes/searchtipo.pipe';

@Component({
  selector: 'app-list-tipos',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule, ReactiveFormsModule, NewTipoComponent, SearchestadoPipe, SearchtipoPipe],
  templateUrl: './list-tipos.component.html',
  styleUrl: './list-tipos.component.css'
})
export class ListTiposComponent {

listTipos: tipoNotUndefined[] = [];
p: number = 1;
showModal: boolean = false;
isOpen: boolean = false;
tipoForm!: FormGroup;
id_tipo: number = 0;
nombreTipo: string = '';

searchValueTipo: string = '';
  selectEstado: string = "2";

tiposService = inject(TiposService);
modalService = inject(ModalService)

ngOnInit(): void {
  // Obtenemos todos los tipos
  this.getTipos();
}

constructor(private fb: FormBuilder) {
  this.tipoForm = this.fb.group({
    id_tipo: [0],
    nombre: ['', Validators.required],
    estado: [0, Validators.required],
    sw: [null]
  });
}


getTipos(): void {
  this.tiposService.getTipos().subscribe(
    (data) => {
      this.listTipos = data;
    },
    (error) => {
      console.error('Error al obtener los tipos:', error);
    }
  );
}

openModalDelete(id: number, nombre: string) {
  this.nombreTipo = nombre;
  this.id_tipo = id;
}

openModalHabilitar(id: number, nombre: string) {
  this.nombreTipo = nombre;
  this.id_tipo = id;
}

// Editar tipos
closeModalEditar(): void {
  this.isOpen = false;
}

openModalEditar(): void {
  this.isOpen = true;
}

// Método para cargar el tipo por ID
cargarTipo(id: number): void {
  this.tiposService.getTipoPorId(id).subscribe({
    next: (formdata) => {
      console.log('formdata desde cargar tipo:', formdata);
      console.log('formdata desde cargar tipo:', formdata.sw);
      if (formdata) {
        this.tipoForm.patchValue({
          nombre: formdata.nombre,
          sw: formdata.sw ? '1' : null  // Asegura que "sw" sea "1" como cadena
        });
      }
    },
    error: (err) => {
      console.error('Error al cargar el tipo:', err);
    }
  });
}

actualizarTipo() {
  if (this.tipoForm.valid) {
    const tipoData = this.tipoForm.value;

    const formData = new FormData();
    formData.append('tipo', JSON.stringify(tipoData));

    console.log('Datos a enviar como FormData:', formData);

    this.tiposService.actualizarTipo(formData).subscribe({
      next: (response) => {
        console.log('Tipo actualizado:', response);
        this.showSuccessModal();
      },
      error: (err) => {
        console.error('Error actualizando tipo:', err);
      }
    });
  } else {
    console.log('Formulario no válido:', this.tipoForm.errors);
  }
}

// Método para mostrar un modal de creado con éxito
showSuccessModal() {
  this.showModal = true;
  setTimeout(() => {
    this.showModal = false;
    this.closeModalEditar();
  }, 1000);
}

deleteTipo() {
  const payload = { id_tipo: this.id_tipo };
  console.log('id_tipo desde delete tipo: ', this.id_tipo);
  this.tiposService.deleteTipo(payload).subscribe({
    next: (respuesta) => {
      console.log('Tipo actualizado:', respuesta);
      this.getTipos();
    },
    error: (error) => {
      console.error('Error al actualizar el tipo:', error);
    }
  });
}

habilitarTipo() {
  const payload = { id_tipo: this.id_tipo };
  console.log('id desde habilitar', this.id_tipo);
  this.tiposService.habilitarTipo(payload).subscribe({
    next: (respuesta) => {
      console.log('Tipo actualizado:', respuesta);
      this.getTipos();
    },
    error: (error) => {
      console.error('Error al actualizar el tipo:', error);
    }
  });
}

// Llama al servicio para abrir el modal new tipo
openModal() {
  this.modalService.openModal(); // Abre el modal
}

}

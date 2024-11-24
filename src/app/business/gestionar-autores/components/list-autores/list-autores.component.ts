import { Component, inject } from '@angular/core';
import { AutorNotUndefined } from '../../models/list-autores.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutoresService } from '../../services/autores.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewAutorComponent } from "../new-autor/new-autor.component";

@Component({
  selector: 'app-list-autores',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, ReactiveFormsModule, NewAutorComponent],
  templateUrl: './list-autores.component.html',
  styleUrl: './list-autores.component.css'
})
export class ListAutoresComponent {
  autoresFiltradas: AutorNotUndefined[] = [];
  listAutores: AutorNotUndefined[] = [];
  p: number = 1;
  showModal: boolean = false;
  isOpen: boolean = false;
  autorForm!: FormGroup;
  id_autor: number = 0;
  nombreAutor: string = '';
  
  autoresService = inject(AutoresService);
  
  ngOnInit(): void {
    // Obtenemos todos los autores
    this.getAutores();
  
    // Suscríbete a los cambios en el servicio
    this.autoresService.autorSource$.subscribe(autores => {
      this.autoresFiltradas = autores; // Actualiza la lista de autores
    });
  
    // Escuchar cambios en el estado de autor seleccionado
    this.autoresService.estadoSeleccionado$.subscribe(autor => {
      this.filtrarAutoresPorEstado(autor);
    });
  }
  
  constructor(private fb: FormBuilder) {
    this.autorForm = this.fb.group({
      id_autor: [0],
      nombre: ['', Validators.required],
      ap: ['', Validators.required],
      am: [''],
      genero: ['', Validators.required],
      estado: [0, Validators.required]
    });
  }
  
  filtrarAutoresPorEstado(autor: any) {
    const autorNumero = Number(autor);
    console.log('autor desde list: ', autorNumero);
    
    if (autorNumero === 2) {
      this.autoresFiltradas = this.listAutores;
    } else {
      this.autoresFiltradas = this.listAutores.filter(autor => autor.estado === autorNumero);
    }
  }
  
  getAutores(): void {
    this.autoresService.getAutores().subscribe(
      (data) => {
        this.listAutores = data;
        this.autoresFiltradas = data;
      },
      (error) => {
        console.error('Error al obtener los autores:', error);
      }
    );
  }
  
  openModalDelete(id: number, nombre: string) {
    this.nombreAutor = nombre;
    this.id_autor = id;
    const modal = document.getElementById('popup-modal');
      
    if (modal) {
      modal.classList.add('block');
      modal.classList.remove('hidden');
    }
  }
  
  openModalHabilitar(id: number, nombre: string) {
    this.nombreAutor = nombre;
    this.id_autor = id;
  
    const modal = document.getElementById('popup-modal-one');
      
    if (modal) {
      modal.classList.add('block');
      modal.classList.remove('hidden');
    }
  }
  
  // Editar autores
  closeModalEditar(): void {
    this.isOpen = false;
  }
  
  openModalEditar(): void {
    this.isOpen = true;
  }
  
  // Método para cargar el autor por ID
  cargarAutor(id: number): void {
    this.autoresService.getAutorPorId(id).subscribe({
      next: (formdata) => {
        console.log('formdata desde cargar autor:', formdata);
        if (formdata) {
          this.autorForm.patchValue(formdata)
        }
      },
      error: (err) => {
        console.error('Error al cargar el autor:', err);
      }
    });
  }
  
  actualizarAutor() {
    if (this.autorForm.valid) {
      const autorData = this.autorForm.value;
  
      const formData = new FormData();
      formData.append('autor', JSON.stringify(autorData));
  
      console.log('Datos a enviar como FormData:', formData);
  
      this.autoresService.actualizarAutor(formData).subscribe({
        next: (response) => {
          console.log('Autor actualizado:', response);
          this.showSuccessModal();
        },
        error: (err) => {
          console.error('Error actualizando autor:', err);
        }
      });
    } else {
      console.log('Formulario no válido:', this.autorForm.errors);
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
  
  deleteAutor() {
    const payload = { id_autor: this.id_autor };
    console.log('id_autor desde delete autor: ', this.id_autor);
    this.autoresService.deleteAutor(payload).subscribe({
      next: (respuesta) => {
        console.log('Autor eliminado:', respuesta);
        this.getAutores();
      },
      error: (error) => {
        console.error('Error al eliminar el autor:', error);
      }
    });
  
    const modal = document.getElementById('popup-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('block');
    }
  }
  
  habilitarAutor() {
    const payload = { id_autor: this.id_autor };
    console.log('id desde habilitar', this.id_autor);
    this.autoresService.habilitarAutor(payload).subscribe({
      next: (respuesta) => {
        console.log('Autor habilitado:', respuesta);
        this.getAutores();
      },
      error: (error) => {
        console.error('Error al habilitar el autor:', error);
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
  
}

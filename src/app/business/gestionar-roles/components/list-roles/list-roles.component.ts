import { Component, inject } from '@angular/core';
import { rolNotUndefined } from '../../models/list-roles.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RolesService } from '../../services/roles.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../../pipes/search.pipe';
import { NewRolComponent } from "../new-rol/new-rol.component";
import { EstadoppPipe } from '../../pipes/estadopp.pipe';

@Component({
  selector: 'app-list-roles',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, ReactiveFormsModule, FormsModule, SearchPipe, EstadoppPipe, NewRolComponent],
  templateUrl: './list-roles.component.html',
  styleUrl: './list-roles.component.css'
})
export class ListRolesComponent {
  rolesFiltrados: rolNotUndefined[] = [];
  listRoles: rolNotUndefined[] = [];
  p: number = 1;
  showModal: boolean = false;
  isOpen: boolean = false;
  rolForm!: FormGroup;
  id_rol: number = 0;
  nombreRol: string = '';
  
  rolesService = inject(RolesService);
  //variables para los pipes
  searchValue: string = '';
  selectEstado: string = '2';
  
  ngOnInit(): void {
    //obtenemos todos los roles
    this.getRoles();
    console.log('valor del selectestado para filtrar:', this.selectEstado);
  }
  
  constructor(private fb: FormBuilder){
    this.rolForm = this.fb.group({
      id_rol: [0],
      nombre: ['', Validators.required],
      estado: [0, Validators.required],
    });
  }
  

  
  getRoles(): void {
    this.rolesService.getRol().subscribe(
      (data) => {
        this.listRoles = data;  // Asigna los datos recibidos a la variable users
        this.rolesFiltrados = data;
        console.log('Roles desde el servicio:', this.listRoles);
        console.log('Roles filtrados:', this.rolesFiltrados);
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }
  
  openModalDelete(id: number, nombre: string) {
    this.nombreRol = nombre;
    this.id_rol = id;
    const modal = document.getElementById('popup-modal');
      
    if (modal) {
      modal.classList.add('block');
      modal.classList.remove('hidden');
    }
  }
  
  openModalHabilitar(id: number, nombre: string) {
    
    this.nombreRol = nombre;
    this.id_rol = id;
  
    const modal = document.getElementById('popup-modal-one');
      
    if (modal) {
      modal.classList.add('block');
      modal.classList.remove('hidden');
    }
  }
  
  //editar roles
  closeModalEditar(): void{
    this.isOpen = false;
  }
  
  openModalEditar(): void{
    this.isOpen = true;
  }
  
  // Método para cargar el rol por ID
  cargarRol(id: number): void {
    this.rolesService.getRolPorId(id).subscribe({
      next: (formdata) => {
        console.log('formdata desde cargar rol:', formdata); 
        if (formdata) {
          this.rolForm.patchValue(formdata);
        }
      },
      error: (err) => {
        console.error('Error al cargar el rol:', err);
      }
    });
  }
  
  actualizarRol() {
    if (this.rolForm.valid) {
        const rolData = this.rolForm.value;
        
        const formData = new FormData();
        formData.append('rol', JSON.stringify(rolData));
  
        console.log('Datos a enviar como FormData:', formData);
  
        this.rolesService.actualizarRol(formData).subscribe({
            next: (response) => {
                console.log('Rol actualizado:', response);
                this.showSuccessModal()
            },
            error: (err) => {
                console.error('Error actualizando rol:', err);
            }
        });
    } else {
        console.log('Formulario no válido:', this.rolForm.errors);
    }
  }
  
  //metodo para mostrar un modal de creado con exito
  showSuccessModal() {
    this.showModal = true;
    setTimeout(() => {
      this.showModal = false;
      this.closeModalEditar();
    }, 1000);
  }
  
  deleteRol() {
    const payload = { id_rol: this.id_rol}; 
    console.log('id_rol desde delete rol: ',this.id_rol)
    this.rolesService.deleteRol(payload).subscribe({
      next: (respuesta) => {
        console.log('Rol eliminado:', respuesta);
        this.getRoles()
      },
      error: (error) => {
        console.error('Error al eliminar rol:', error);
      }
    });
  
    const modal = document.getElementById('popup-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('block');
    }
  }
  
  habilitarRol(){
    const payload = { id_rol: this.id_rol};
    console.log('id desde hab',this.id_rol)
    this.rolesService.habilitaRol(payload).subscribe({
      next: (respuesta) => {
        console.log('Rol habilitado:', respuesta);
        this.getRoles()
      },
      error: (error) => {
        console.error('Error al habilitar el rol:', error);
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

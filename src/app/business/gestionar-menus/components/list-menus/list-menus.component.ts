import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenusService } from '../../services/menus.service';
import { menuNotUndefined } from '../../models/list-menus.model';
import { NewMenuComponent } from "../new-menu/new-menu.component";
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../../pipes/search.pipe';
import { EstadoppPipe } from '../../pipes/estadopp.pipe';

@Component({
  selector: 'app-list-menus',
  standalone: true,
  imports: [NewMenuComponent, CommonModule, NgxPaginationModule, ReactiveFormsModule, FormsModule, SearchPipe, EstadoppPipe],
  templateUrl: './list-menus.component.html',
  styleUrl: './list-menus.component.css'
})
export class ListMenusComponent {
  menusFiltrados: menuNotUndefined[] = [];
  listMenus: menuNotUndefined[] = [];
  p: number = 1;
  showModal: boolean = false;
  isOpen: boolean = false;
  menuForm!: FormGroup;
  id_menu: number = 0;
  nombreMenu: string = '';

  menusService = inject(MenusService);
  //variables para los pipes
searchValue: string = ' ';
selectEstado: number = 2;

ngOnInit(): void {
  //obtenemos todos los menus
  this.getMenus();

  // Suscríbete a los cambios en el servicio
  this.menusService.menuSource$.subscribe(menus => {
    this.menusFiltrados = menus; // Actualiza la lista de personas
  });

  // Escuchar cambios en el estado de persona seleccionado
  this.menusService.estadoSeleccionado$.subscribe(tipo => {
    this.filtrarMenusPorEstado(tipo);
  });
}

constructor(private fb: FormBuilder){
  this.menuForm = this.fb.group({
    id_menu: [0],
    nombre: ['', Validators.required],
    estado: [0, Validators.required],
  });
}

filtrarMenusPorEstado(tipo: any) {
  // Convierte tipo a un número explícitamente
  const tipoNumero = Number(tipo);
  console.log('tipo persona desde list: ', tipoNumero);
  
  if (tipoNumero === 2) {
    this.menusFiltrados = this.listMenus;
  } else {
    this.menusFiltrados = this.listMenus.filter(menu => menu.estado === tipoNumero);
  }
}

getMenus(): void {
  this.menusService.getMenu().subscribe(
    (data) => {
      this.listMenus = data;  // Asigna los datos recibidos a la variable users
      this.menusFiltrados = data;
      //console.log('personas: back: ',data);  // Para verificar que los usuarios han sido obtenidos correctamente
    },
    (error) => {+
      console.error('Error al obtener los usuarios:', error);
    }
  );
}

openModalDelete(id: number, nombre: string) {
  this.nombreMenu = nombre;
  this.id_menu = id;
  const modal = document.getElementById('popup-modal');
    
  if (modal) {
    // Agrega las clases necesarias para mostrar el modal
    modal.classList.add('block'); // Asegúrate de que el modal tenga la clase para mostrarlo
    modal.classList.remove('hidden'); // Elimina la clase que oculta el modal
  }
}

openModalHabilitar(id: number, nombre: string) {
  
  this.nombreMenu = nombre;
  this.id_menu = id;

  const modal = document.getElementById('popup-modal-one');
    
  if (modal) {
    // Agrega las clases necesarias para mostrar el modal
    modal.classList.add('block'); // Asegúrate de que el modal tenga la clase para mostrarlo
    modal.classList.remove('hidden'); // Elimina la clase que oculta el modal
  }
}

//editar menus
closeModalEditar(): void{
  this.isOpen = false;
}

openModalEditar(): void{
  this.isOpen = true;
}

// Método para cargar el menu por ID
cargarMenu(id: number): void {
  this.menusService.getMenuPorId(id).subscribe({
    next: (formdata) => {
      console.log('formdata desde cargar menu:', formdata); // Agrega esta línea para inspeccionar el contenido de formdata
      if (formdata) {
        this.menuForm.patchValue(formdata);
      }
    },
    error: (err) => {
      console.error('Error al cargar el menu:', err);
    }
  });
}

actualizarMenu() {
  if (this.menuForm.valid) {
      const menuData = this.menuForm.value;
      // Agregamos un valor por defecto

      // Crear un FormData directamente con los datos del formulario
      const formData = new FormData();

      // Agregar los datos del menu como JSON
      formData.append('menu', JSON.stringify(menuData));

      // Verifica el contenido de formData antes de enviarlo
      console.log('Datos a enviar como FormData:', formData);

      // Llamar al servicio para enviar los datos al backend
      this.menusService.actualizarMenu(formData).subscribe({
          next: (response) => {
              console.log('Menu actualizado:', response);
              this.showSuccessModal()
          },
          error: (err) => {
              console.error('Error actualizando menu:', err);
          }
      });
  } else {
      console.log('Formulario no válido:', this.menuForm.errors);
  }
}

//metodo para mostrar un modal de creado con exito
showSuccessModal() {
  this.showModal = true;
  setTimeout(() => {
    this.showModal = false;
    this.closeModalEditar();
  }, 1000); // Oculta el modal después de 1 segundos
}

deleteMenu() {
  const payload = { id_menu: this.id_menu}; // Crea el objeto JSON con el atributo id_menu
  console.log('id_menu desde delete menu: ',this.id_menu)
  this.menusService.deleteMenu(payload).subscribe({
    next: (respuesta) => {
      console.log('Menu eliminado:', respuesta);
      this.getMenus()
    },
    error: (error) => {
      console.error('Error al eliminar menu:', error);
    }
  });

  const modal = document.getElementById('popup-modal');
  if (modal) {
      modal.classList.add('hidden'); // Agrega la clase que oculta el modal
      modal.classList.remove('block'); // Asegúrate de que se remueva la clase que lo muestra
  }
}

habilitarMenu(){
  const payload = { id_menu: this.id_menu}; // Crea el objeto JSON con el atributo id_menu
  console.log('id desde hab',this.id_menu)
  this.menusService.habilitaMenu(payload).subscribe({
    next: (respuesta) => {
      console.log('Menu habilitado:', respuesta);
      this.getMenus()
    },
    error: (error) => {
      console.error('Error al habilitar el menu:', error);
    }
  });

  const modal = document.getElementById('popup-modal-one');
  if (modal) {
      modal.classList.add('hidden'); // Agrega la clase que oculta el modal
      modal.classList.remove('block'); // Asegúrate de que se remueva la clase que lo muestra
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

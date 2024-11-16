import { Component, inject } from '@angular/core';
import { editorialNotUndefined } from '../../models/list-editoriales.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditorialesService } from '../../services/editoriales.service';
import { NewEditorialComponent } from "../new-editorial/new-editorial.component";
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-list-editoriales',
  standalone: true,
  imports: [NewEditorialComponent, CommonModule, NgxPaginationModule, ReactiveFormsModule],
  templateUrl: './list-editoriales.component.html',
  styleUrl: './list-editoriales.component.css'
})
export class ListEditorialesComponent {

  editorialesFiltradas: editorialNotUndefined[] = [];
  listEditoriales: editorialNotUndefined[] = [];
  p: number = 1;
  showModal: boolean = false;
  isOpen: boolean = false;
  editorialForm!: FormGroup;
  id_editorial: number = 0;
  nombreEditorial: string = '';


  editorialesService = inject(EditorialesService);


ngOnInit(): void {
  //obtenemos todas las areas
  this.getEditoriales();

  // Suscríbete a los cambios en el servicio
  this.editorialesService.editorialSource$.subscribe(editoriales => {
    this.editorialesFiltradas = editoriales; // Actualiza la lista de personas
  });

  // Escuchar cambios en el estado de persona seleccionado
  this.editorialesService.estadoSeleccionado$.subscribe(tipo => {
    this.filtrarEditorialesPorEstado(tipo);
  });
}

constructor(private fb: FormBuilder){
  this.editorialForm = this.fb.group({
    id_editorial: [0],
    nombre: ['', Validators.required],
    estado: [0, Validators.required],
  });
}

filtrarEditorialesPorEstado(tipo: any) {
  // Convierte tipo a un número explícitamente
  const tipoNumero = Number(tipo);
  console.log('tipo persona desde list: ', tipoNumero);
  
  if (tipoNumero === 2) {
    this.editorialesFiltradas = this.listEditoriales;
  } else {
    this.editorialesFiltradas = this.listEditoriales.filter(editorial => editorial.estado === tipoNumero);
  }
}

  getEditoriales(): void {
    this.editorialesService.getEditorial().subscribe(
      (data) => {
        this.listEditoriales = data;  // Asigna los datos recibidos a la variable users
        this.editorialesFiltradas = data;
        //console.log('personas: back: ',data);  // Para verificar que los usuarios han sido obtenidos correctamente
      },
      (error) => {+
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }



  openModalDelete(id: number, nombre: string) {
    this.nombreEditorial = nombre;
  this.id_editorial = id;
    const modal = document.getElementById('popup-modal');
      
    if (modal) {
      // Agrega las clases necesarias para mostrar el modal
      modal.classList.add('block'); // Asegúrate de que el modal tenga la clase para mostrarlo
      modal.classList.remove('hidden'); // Elimina la clase que oculta el modal
    }
      
  }


  openModalHabilitar(id: number, nombre: string) {
    
    this.nombreEditorial = nombre;
    this.id_editorial = id;
  
    const modal = document.getElementById('popup-modal-one');
      
    if (modal) {
      // Agrega las clases necesarias para mostrar el modal
      modal.classList.add('block'); // Asegúrate de que el modal tenga la clase para mostrarlo
      modal.classList.remove('hidden'); // Elimina la clase que oculta el modal
    }
      
  }



  //editar areas
  closeModalEditar(): void{
    this.isOpen = false;
  }

  openModalEditar(): void{
    this.isOpen = true;
  }

  // Método para cargar la persona por ID
cargarEditorial(id: number): void {
  this.editorialesService.getEditorialPorId(id).subscribe({
    next: (formdata) => {
      console.log('formdata desde cargar area:', formdata); // Agrega esta línea para inspeccionar el contenido de formdata
      if (formdata) {
        this.editorialForm.patchValue(formdata);
      }
    },
    error: (err) => {
      console.error('Error al cargar el area:', err);
    }
  });
}

actualizarEditorial() {
  if (this.editorialForm.valid) {
      const areaData = this.editorialForm.value;
      // Agregamos un valor por defecto

      // Crear un FormData directamente con los datos del formulario
      const formData = new FormData();

      // Agregar los datos de la persona como JSON
      formData.append('editorial', JSON.stringify(areaData));

      // Verifica el contenido de formData antes de enviarlo
      console.log('Datos a enviar como FormData:', formData);

      // Llamar al servicio para enviar los datos al backend
      this.editorialesService.actualizarEditorial(formData).subscribe({
          next: (response) => {
              console.log('Persona actualizada:', response);
              this.showSuccessModal()
          },
          error: (err) => {
              console.error('Error actualizando persona:', err);
          }
      });
  } else {
      console.log('Formulario no válido:', this.editorialForm.errors);
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

  deleteEditorial() {
    const payload = { id_editorial: this.id_editorial}; // Crea el objeto JSON con el atributo id_persona
    console.log('id_area desde delete area: ',this.id_editorial)
    this.editorialesService.deleteEditorial(payload).subscribe({
      next: (respuesta) => {
        console.log('Persona actualizada:', respuesta);
        this.getEditoriales()
      },
      error: (error) => {
        console.error('Error al actualizar la persona:', error);
      }
    });

    const modal = document.getElementById('popup-modal');
    if (modal) {
        modal.classList.add('hidden'); // Agrega la clase que oculta el modal
        modal.classList.remove('block'); // Asegúrate de que se remueva la clase que lo muestra
    }
  }
  
  habilitarEditorial(){
    const payload = { id_editorial: this.id_editorial}; // Crea el objeto JSON con el atributo id_persona
    console.log('id desde hab',this.id_editorial)
    this.editorialesService.habilitaEditorial(payload).subscribe({
      next: (respuesta) => {
        console.log('Persona actualizada:', respuesta);
        this.getEditoriales()
      },
      error: (error) => {
        console.error('Error al actualizar la persona:', error);
      }
    });
  
    const modal = document.getElementById('popup-modal-one');
    if (modal) {
        modal.classList.add('hidden'); // Agrega la clase que oculta el modal
        modal.classList.remove('block'); // Asegúrate de que se remueva la clase que lo muestra
    }
  }


}

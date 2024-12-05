import { Component, inject } from '@angular/core';
import { editorialNotUndefined } from '../../models/list-editoriales.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditorialesService } from '../../services/editoriales.service';
import { NewEditorialComponent } from "../new-editorial/new-editorial.component";
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalService } from '../../services/modal.service';
import { SearcheditorialPipe } from '../../pipes/searcheditorial.pipe';
import { SearchestadoPipe } from '../../pipes/searchestado.pipe';

@Component({
  selector: 'app-list-editoriales',
  standalone: true,
  imports: [FormsModule, NewEditorialComponent, CommonModule, NgxPaginationModule, ReactiveFormsModule, SearcheditorialPipe, SearchestadoPipe],
  templateUrl: './list-editoriales.component.html',
  styleUrl: './list-editoriales.component.css'
})
export class ListEditorialesComponent {
  listEditoriales: editorialNotUndefined[] = [];
  p: number = 1;
  showModal: boolean = false;
  isOpen: boolean = false;
  editorialForm!: FormGroup;
  id_editorial: number = 0;
  nombreEditorial: string = '';

  searchValueEditorial: string = '';
  selectEstado: string = "2";


  editorialesService = inject(EditorialesService);
  modalService = inject(ModalService);

ngOnInit(): void {
  //obtenemos todas las areas
  this.getEditoriales();
}

constructor(private fb: FormBuilder){
  this.editorialForm = this.fb.group({
    id_editorial: [0],
    nombre: ['', Validators.required],
    estado: [0, Validators.required],
  });
}


  getEditoriales(): void {
    this.editorialesService.getEditorial().subscribe(
      (data) => {
        this.listEditoriales = data;  // Asigna los datos recibidos a la variable users
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
  }


  openModalHabilitar(id: number, nombre: string) {
    
    this.nombreEditorial = nombre;
    this.id_editorial = id; 
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
  }

   // Llama al servicio para abrir el modal
   openModal() {
    this.modalService.openModal(); // Abre el modal
  }

}

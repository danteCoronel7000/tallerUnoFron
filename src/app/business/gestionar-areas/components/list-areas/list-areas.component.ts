import { Component, inject, OnInit } from '@angular/core';
import { NewAreaComponent } from "../new-area/new-area.component";
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { AreaNotUndefined, Areas } from '../../models/list-areas.model';
import { AreasService } from '../../services/areas.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-areas',
  standalone: true,
  imports: [NewAreaComponent, CommonModule, NgxPaginationModule, ReactiveFormsModule],
  templateUrl: './list-areas.component.html',
  styleUrl: './list-areas.component.css'
})
export class ListAreasComponent implements OnInit{

  areasFiltradas: AreaNotUndefined[] = [];
  listAreas: AreaNotUndefined[] = [];
  p: number = 1;
  showModal: boolean = false;
  isOpen: boolean = false;
  areaForm!: FormGroup;
  id_area: number = 0;
  nombreArea: string = '';


areasService = inject(AreasService);


ngOnInit(): void {
  //obtenemos todas las areas
  this.getAreas();

  // Suscríbete a los cambios en el servicio
  this.areasService.areasSource$.subscribe(areas => {
    this.areasFiltradas = areas; // Actualiza la lista de personas
  });

  // Escuchar cambios en el estado de persona seleccionado
  this.areasService.estadoSeleccionado$.subscribe(tipo => {
    this.filtrarAreasPorEstado(tipo);
  });
}

constructor(private fb: FormBuilder){
  this.areaForm = this.fb.group({
    id_area: [0],
    nombre: ['', Validators.required],
    estado: [0, Validators.required],
  });
}

filtrarAreasPorEstado(tipo: any) {
  // Convierte tipo a un número explícitamente
  const tipoNumero = Number(tipo);
  console.log('tipo persona desde list: ', tipoNumero);
  
  if (tipoNumero === 2) {
    this.areasFiltradas = this.listAreas;
  } else {
    this.areasFiltradas = this.listAreas.filter(area => area.estado === tipoNumero);
  }
}

  getAreas(): void {
    this.areasService.getAreas().subscribe(
      (data) => {
        this.listAreas = data;  // Asigna los datos recibidos a la variable users
        this.areasFiltradas = data;
        //console.log('personas: back: ',data);  // Para verificar que los usuarios han sido obtenidos correctamente
      },
      (error) => {+
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }



  openModalDelete(id: number, nombre: string) {
    this.nombreArea = nombre;
  this.id_area = id;
    const modal = document.getElementById('popup-modal');
      
    if (modal) {
      // Agrega las clases necesarias para mostrar el modal
      modal.classList.add('block'); // Asegúrate de que el modal tenga la clase para mostrarlo
      modal.classList.remove('hidden'); // Elimina la clase que oculta el modal
    }
      
  }


  openModalHabilitar(id: number, nombre: string) {
    
    this.nombreArea = nombre;
    this.id_area = id;
  
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
cargarArea(id: number): void {
  this.areasService.getAreaPorId(id).subscribe({
    next: (formdata) => {
      console.log('formdata desde cargar area:', formdata); // Agrega esta línea para inspeccionar el contenido de formdata
      if (formdata) {
        this.areaForm.patchValue(formdata);
      }
    },
    error: (err) => {
      console.error('Error al cargar el area:', err);
    }
  });
}

actualizarArea() {
  if (this.areaForm.valid) {
      const areaData = this.areaForm.value;
      // Agregamos un valor por defecto

      // Crear un FormData directamente con los datos del formulario
      const formData = new FormData();

      // Agregar los datos de la persona como JSON
      formData.append('area', JSON.stringify(areaData));

      // Verifica el contenido de formData antes de enviarlo
      console.log('Datos a enviar como FormData:', formData);

      // Llamar al servicio para enviar los datos al backend
      this.areasService.actualizarArea(formData).subscribe({
          next: (response) => {
              console.log('Persona actualizada:', response);
              this.showSuccessModal()
          },
          error: (err) => {
              console.error('Error actualizando persona:', err);
          }
      });
  } else {
      console.log('Formulario no válido:', this.areaForm.errors);
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

  deleteArea() {
    const payload = { id_area: this.id_area}; // Crea el objeto JSON con el atributo id_persona
    console.log('id_area desde delete area: ',this.id_area)
    this.areasService.deleteArea(payload).subscribe({
      next: (respuesta) => {
        console.log('Persona actualizada:', respuesta);
        this.getAreas()
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
  
  habilitarArea(){
    const payload = { id_area: this.id_area}; // Crea el objeto JSON con el atributo id_persona
    console.log('id desde hab',this.id_area)
    this.areasService.habilitarArea(payload).subscribe({
      next: (respuesta) => {
        console.log('Persona actualizada:', respuesta);
        this.getAreas()
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

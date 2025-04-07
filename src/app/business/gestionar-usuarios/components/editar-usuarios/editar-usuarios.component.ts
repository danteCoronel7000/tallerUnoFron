import { Component, inject, OnInit } from '@angular/core';
import { ModalFormService } from '../../../users/services/modal-form.service';
import { CommonModule } from '@angular/common';
import { PersonasService } from '../../services/personas.service';
import { MediaService } from '../../../users/services/media.service';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { validateHeaderName } from 'http';

@Component({
  selector: 'app-editar-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-usuarios.component.html',
  styleUrl: './editar-usuarios.component.css'
})
export class EditarUsuariosComponent implements OnInit{
  modalService = inject(ModalFormService)

  personasService = inject(PersonasService);
  mediaService = inject(MediaService);
  personaForm!: FormGroup;
  foto_url: string = '';
  

  url: string ='';
  selectedFile: any;

  constructor(private fb: FormBuilder) {
    this.personaForm = this.fb.group({
      id_persona: [0],
      datos: this.fb.group({
        ci: ['', Validators.required]
      }),
      nombre: ['', Validators.required],
      ap: ['', Validators.required],
      am: [''],
      genero: ['', Validators.required],
      tipo_per: ['', Validators.required],
      telefonos: this.fb.array([]) // Aquí se inicializa el FormArray de teléfonos
    });
  }
  ngOnInit(): void {
    this.personasService.valorActual.subscribe((valor) => {
      this.cargarPersona(valor);
    });
  }

  get telefonos(): FormArray {
    return this.personaForm.get('telefonos') as FormArray;
  }

  addTelefono(): void {
    this.telefonos.push(this.fb.group({
      numero: ['']
    }));
  }

  removeTelefono(index: number): void {
    this.telefonos.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.personaForm.value); // Aquí verás todos los valores del formulario incluyendo los teléfonos
  }

  actualizarPersona() {
    if (this.personaForm.valid) {
        const personaData = this.personaForm.value;
        // Agregamos un valor por defecto 
        personaData.estado = 1;
        console.log('Datos a enviar como FormData:', personaData);

        // Crear un FormData directamente con los datos del formulario
        const formData = new FormData();

        // Agregar los datos de la persona como JSON
        formData.append('persona', JSON.stringify(personaData));

        // Si se ha seleccionado una imagen, adjuntarla
        if (this.selectedFile) {
            formData.append('file', this.selectedFile);
        }

        // Verifica el contenido de formData antes de enviarlo
        console.log('Datos a enviar como FormData:', formData);

        // Llamar al servicio para enviar los datos al backend
        this.personasService.actualizarPersona(formData).subscribe({
            next: (response) => {
                console.log('Persona actualizada:', response);
                this.closeModal();
            },
            error: (err) => {
                console.error('Error actualizando persona:', err);
            }
        });
    } else {
        console.log('Formulario no válido:', this.personaForm.errors);
    }
}

  
// Método para cargar la persona por ID
cargarPersona(id: number): void {
  this.personasService.getPersonaById(id).subscribe({
    next: (formdata) => {
      console.log('formdata de la persona a acutalizar:', formdata); // Agrega esta línea para inspeccionar el contenido de formdata
      if (formdata) {
        this.foto_url = formdata.foto || '';
        this.personaForm.patchValue(formdata);

        // Limpiar los teléfonos actuales en el FormArray
        this.telefonos.clear();

        // Verificar si 'telefonos' existe y es un array antes de iterar
        if (Array.isArray(formdata.telefonos)) {
          formdata.telefonos.forEach((tel: { numero: string }) => {
            this.telefonos.push(this.fb.group({ numero: tel.numero }));
          });
        } else {
          console.log("La persona no tiene teléfonos registrados o 'telefonos' no es un array.");
        }
      }
    },
    error: (err) => {
      console.error('Error al cargar la persona:', err);
    }
  });
}


  
  onFileSelected(event: any) {
    const file = event.target.files[0]; // Capturar el archivo seleccionado
  
    if (file) {
      this.selectedFile = file; // Almacenar el archivo seleccionado en la variable 'selectedFile'
      console.log('Archivo seleccionado:', this.selectedFile);
    }
  }
  

  upload(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
  
      // Llamada al servicio de subida de archivos
      this.mediaService.uploadFile(formData).subscribe(response => {
        console.log('response: ', response);
        this.url = response.url; // Guardar la URL de la imagen
        this.selectedFile = file; // Guardar el archivo seleccionado
      });
    }
  }
  


  closeModal() {
    this.modalService.closeModalEditUser();
  }
}

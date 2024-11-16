import { Component, inject, OnInit } from '@angular/core';
import { ModalFormService } from '../../../users/services/modal-form.service';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MediaService } from '../../../users/services/media.service';
import { PersonasService } from '../../services/personas.service';
import { AddUsuarioService } from '../../services/add-usuario.service';


@Component({
  selector: 'app-new-personal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-personal.component.html',
  styleUrl: './new-personal.component.css'
})
export class NewPersonalComponent{

  modalService = inject(ModalFormService);
  personasService = inject(PersonasService);
  mediaService = inject(MediaService);
  personaForm!: FormGroup;

  url: string ='';
  selectedFile: any;

  constructor(private fb: FormBuilder) {
    this.personaForm = this.fb.group({
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

  crearPersona() {
    if (this.personaForm.valid) {
      const personaData = this.personaForm.value;
      //agregamos un valor por defecto 
      personaData.estado = 1;
  
      // Crear un FormData directamente con los datos del formulario
      const formData = new FormData();
      formData.append('persona', JSON.stringify(personaData)); // Agrega los datos de la persona
  
      // Si se ha seleccionado una imagen, adjuntarla
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }

      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
  
      // Llamar al servicio para enviar los datos al backend
      this.personasService.createPersona(formData).subscribe({
        next: (response) => {
          console.log('Persona creada:', response);
          this.closeModal();
        },
        error: (err) => {
          console.error('Error creando persona:', err);
        }
      });
    }
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
    this.modalService.closeModalNewUser();
  }
}

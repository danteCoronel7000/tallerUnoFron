import { Component, inject, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Area, AutorNotUndefined, Editorial, id_au, Texto, TextoBack } from '../../models/list-textos.model';
import { TextosService } from '../../services/textos.service';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-texto',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-texto.component.html',
  styleUrl: './new-texto.component.css'
})
export class NewTextoComponent implements OnInit{
  modalService = inject(ModalService);

  editoriales: Editorial[] = [];

areas: Area[] = [];

autoresList: AutorNotUndefined[] = [];


autoresListSelect: id_au[] = []; // Lista de autores para las opciones del select
  selectedAuthorIds: number[] = []; // IDs de autores seleccionados

textoForm!: FormGroup;

  isOpen = false;
  showModal = false;

  isDigitalSelected: boolean = false;
  selectedFile: File | null = null;
  
  texto: TextoBack = {
    estado: 1,
    titulo: '',
    resumen: '',
    isbn: '',
    edicion: 0,
    fechapub: '',
    autoresList:[{id_autor:0}],
    area: { id_area: 0 }, // Inicialización del objeto `id_ar`
    editorial: { id_editorial: 0 }, // Inicialización del objeto `id_edi`
  };
  
  constructor(private textosService: TextosService, private fb: FormBuilder) {

    this.textoForm = this.fb.group({
      autoresList: this.fb.array([], Validators.required), // Arreglo para almacenar los IDs de autores seleccionados
    });
  }


  ngOnInit(): void {
    
    this.modalService.modalState$.subscribe(state => {this.isOpen = state});

    //obtenemos los editoriales:
 this.textosService.getEditorial().subscribe((data) =>{this.editoriales = data;});

 //obtenemos las areas:
 this.textosService.getAreas().subscribe((data) =>{this.areas = data;});

 //obtenemos las areas:
 this.textosService.getAutores().subscribe((data) =>{this.autoresList = data;});
  }
  
  onSubmit(): void {
    // Mapea los IDs de autores seleccionados a la estructura correcta
    const autoresArray = this.selectedAuthorIds.map(id => ({ id_autor: id }));
    
  this.texto.autoresList = autoresArray;

    const formData = new FormData();
    formData.append('texto', JSON.stringify(this.texto));

     // Imprimir el contenido de formData en la consola
  console.log('Contenido de FormData:');
  formData.forEach((value, key) => {
    console.log(`${key}:`, value);
  });

    
    this.textosService.createTexto(formData).subscribe({
      next: (response) => {
        console.log('Texto creado:', response);
        // Maneja el éxito
        this.showSuccessModal();
      },
      error: (error) => {
        console.error('Error al crear el texto:', error);
      }
    });
    
  }
  
  // Método para mostrar un modal de creado con éxito
  showSuccessModal() {
      this.showModal = true;
      setTimeout(() => {
          this.showModal = false;
          this.close();
      }, 1000); // Oculta el modal después de 1 segundo
  }
  
  close() {
      this.modalService.closeModal();
  }

/*
  //autores 
  get autores(): FormArray {
    return this.textoForm.get('autores') as FormArray;
  }

  addAutor(): void {
    this.autores.push(this.fb.group({
      nombre: ['', Validators.required],
      ap: ['', Validators.required],
      am: ['', Validators.required],
      genero: ['', Validators.required]
    }));
  }

  removeAutor(index: number): void {
    this.autores.removeAt(index);
  }
*/

  //metodos para subir el archivo digital
  onTipoChange(value: string): void {
    this.isDigitalSelected = (value == 'digital');
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]; // Capturar el archivo seleccionado
  
    if (file) {
      this.selectedFile = file; // Almacenar el archivo seleccionado en la variable 'selectedFile'
      console.log('Archivo seleccionado:', this.selectedFile);
    }
  }

  
}

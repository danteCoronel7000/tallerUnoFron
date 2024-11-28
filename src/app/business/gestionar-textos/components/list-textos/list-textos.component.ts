import { Component, inject } from '@angular/core';
import { Area, Autor, Editorial, TextoBack, TextoNotUndefined, Tipo } from '../../models/list-textos.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextosService } from '../../services/textos.service';
import { NewTextoComponent } from "../new-texto/new-texto.component";
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../../pipes/search.pipe';
import { EstadoppPipe } from '../../pipes/estadopp.pipe';
import { AreasppPipe } from '../../pipes/areaspp.pipe';
import { EditorialesppPipe } from '../../pipes/editorialespp.pipe';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-list-textos',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, ReactiveFormsModule, FormsModule, NewTextoComponent, SearchPipe, EstadoppPipe, AreasppPipe, EditorialesppPipe],
  templateUrl: './list-textos.component.html',
  styleUrl: './list-textos.component.css'
})
export class ListTextosComponent {
listTextos: TextoNotUndefined[] = [];
p: number = 1;
showModal: boolean = false;
isOpenModalEditar: boolean = false;
isDigitalSelected: boolean = false;
selectedFile: File | null = null;
isParaEditar: number = 0;


pdfUrl: SafeResourceUrl | undefined;
openModalPdf: boolean = false;

id_texto: number = 0;
nombreTexto: string = '';
searchValue: string = '';
selectEstado: number = 2;
selectedEditorial: string = '';
urlSegura:  SafeResourceUrl | undefined;
selectedAuthorIds: number[] = []; // IDs de autores seleccionados

editoriales: Editorial[] = [];

autoresList: Autor[] = [];

selectedArea: string = '';
areas: Area[] = [];

selectedTipo: string = '';
tipos: Tipo[] = [];

textosService = inject(TextosService);

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

ngOnInit(): void {
    // Obtenemos todos los textos
    this.getTextos();

    //obtenemos las areas
    this.textosService.getAutores().subscribe((data) =>{this.autoresList = data})

    //obtenemos los editoriales:
    this.textosService.getEditorial().subscribe(
        (data) =>{
            this.editoriales = data;
        }
    );

    //obtenemos las areas:
    this.textosService.getAreas().subscribe(
        (data) =>{
            this.areas = data;
        }
    );

    //obtenemos las tipos:
    this.textosService.getTipos().subscribe(
        (data) =>{
            this.tipos = data;
        }
    );
}

constructor(private sanitizer: DomSanitizer) {
 
}

getTextos(): void {
    this.textosService.getTextos().subscribe(
        (data) => {
            this.listTextos = data;
            console.log('lista de textos: ',this.listTextos)
        },
        (error) => {
            console.error('Error al obtener los textos:', error);
        }
    );
}

openModalDelete(id: number, nombre: string) {
    this.nombreTexto = nombre;
    this.id_texto = id;
    const modal = document.getElementById('popup-modal');

    if (modal) {
        modal.classList.add('block');
        modal.classList.remove('hidden');
    }
}

openModalHabilitar(id: number, nombre: string) {
    this.nombreTexto = nombre;
    this.id_texto = id;

    const modal = document.getElementById('popup-modal-one');

    if (modal) {
        modal.classList.add('block');
        modal.classList.remove('hidden');
    }
}

// Editar textos
closeModalEditar(): void {
    this.isOpenModalEditar = false;
}

openModalEditar(id: number): void {
    this.isParaEditar = id;
    this.isOpenModalEditar = true;
}

// Método para cargar el texto por ID
cargarTexto(id: number): void {
    this.textosService.getTextoPorId(id).subscribe({
        next: (data) => {
            console.log('formdata desde cargar texto:', data);
            if (data) {
                this.texto = data;
                if (this.texto.url) {
                    this.urlSegura = this.sanitizer.bypassSecurityTrustResourceUrl(this.texto.url);
                  }
                this.isDigitalSelected = this.texto.url? true : false;
            }
        },
        error: (err) => {
            console.error('Error al cargar el texto:', err);
        }
    });
}

actualizarTexto() {

    const autoresArray = this.selectedAuthorIds.map(id => ({ id_autor: id }));
    
    this.texto.autoresList = autoresArray;
    this.texto.estado = 1;

    const formData = new FormData();
    formData.append('texto', JSON.stringify(this.texto));

    if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }

     // Imprimir el contenido de formData en la consola
     console.log('id que se mandara al backend para editar un texto: ',this.isParaEditar)
  console.log('Contenido de FormData:');
  formData.forEach((value, key) => {
    console.log(`${key}:`, value);
  });

    
    this.textosService.actualizarTexto(this.isParaEditar ,formData).subscribe({
      next: (response) => {
        console.log('Texto actualizado:', response);
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
        this.closeModalEditar();
    }, 1000);
}

deleteTexto() {
    const payload = { id_texto: this.id_texto };
    console.log('id_texto desde delete texto: ', this.id_texto);
    this.textosService.deleteTexto(payload).subscribe({
        next: (respuesta) => {
            console.log('Texto eliminado:', respuesta);
            this.getTextos();
        },
        error: (error) => {
            console.error('Error al eliminar el texto:', error);
        }
    });

    const modal = document.getElementById('popup-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('block');
    }
}

habilitarTexto() {
    const payload = { id_texto: this.id_texto };
    console.log('id desde habilitar', this.id_texto);
    this.textosService.habilitarTexto(payload).subscribe({
        next: (respuesta) => {
            console.log('Texto habilitado:', respuesta);
            this.getTextos();
        },
        error: (error) => {
            console.error('Error al habilitar el texto:', error);
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


// Método para obtener el valor del input
getInputValue(event: Event): string {
    const input = event.target as HTMLInputElement; // Convertimos el target a HTMLInputElement
    return input.value; // Retornamos el valor
}

onRadioChange(event: any) {
    const texto = event.target.value;
    console.log('estado seleccionado: ', texto);
    this.textosService.actualizarEstado(texto);
}

onFileSelected(event: any) {
    const file = event.target.files[0]; // Capturar el archivo seleccionado
  
    if (file) {
      this.selectedFile = file; // Almacenar el archivo seleccionado en la variable 'selectedFile'
      console.log('Archivo seleccionado:', this.selectedFile);
    }
  }

  
//metodos para el pdf
openModalpdf() {
    // Lógica para abrir el modal
    this.openModalPdf = true;
  }
  
  cerrarModalpdf() {
    this.openModalPdf = false;
  }
  
  async generarPDF(persona: TextoNotUndefined) {
    try {
  
      console.log('Generando PDF para:', persona.titulo);
      
      
      console.log('Imagen convertida a Base64');
  
      // Crear el documento PDF
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Información del texto', 10, 20);
  
  
      // Agregar texto al PDF
      doc.setFontSize(12);
      doc.text(`Titulo: ${persona.titulo}`, 10, 40);  // Ajustar la posición
      doc.text(`Estado: ${persona.estado === 1 ? 'Activo' : 'Inactivo'}`, 10, 50);  // Ajustar la posición
      doc.text(`Isbn: ${persona.isbn}`, 10, 60);  // Ajustar la posición
      doc.text(`Numero de Edicion: ${persona.edicion}`, 10, 70);  // Ajustar la posición
      doc.text(`Fecha Publicacion: ${persona.fechapub}`, 10, 80);  // Ajustar la posición
      doc.text(`resumen: ${persona.resumen}`, 10, 90);  // Ajustar la posición
  
      // Convertir el PDF a un Blob y generar una URL para previsualización
      const blob = doc.output('blob');
      const ulpdf = URL.createObjectURL(blob);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(ulpdf);
   
      // Abrir el modal para previsualizar
      this.openModalpdf();
      console.log('PDF generado y enviado a nueva ventana');
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  }
  

  
}




/*
  transform(value: TextoNotUndefined[], estadoTexto: number): TextoNotUndefined[] {
    console.log('estado texto desde en pipe:', estadoTexto);
    // Si el estadoTexto es 2, retorna toda la lista sin filtrar
    if (estadoTexto == 2) {
        return value;
    }
    // Si estadoTexto es diferente de 2, filtra los textos donde el estado coincida con estadoTexto
    return value.filter(texto => texto.estado == estadoTexto);
}
*/

import { Component, inject } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { NewPersonalComponent } from "../new-personal/new-personal.component";
import { ModalFormService } from '../../../users/services/modal-form.service';
import { EditarUsuariosComponent } from "../editar-usuarios/editar-usuarios.component";
import { AddUsuarioService } from '../../services/add-usuario.service';
import { DeleteUsuarioService } from '../../services/delete-usuario.service';
import { HabilitarUsuarioService } from '../../services/habilitar-usuario.service';
import { PersonasService } from '../../services/personas.service';
import { EditarUsuarioService } from '../../services/editar-usuario.service';
import { EditarUsuarioComponent } from "../editar-usuario-password/editar-usuario.component";
import { NewUsuarioComponent } from "../new-usuario/new-usuario.component";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SearchpersonaPipe } from '../../pipes/searchpersona.pipe';
import { Persona } from '../../models/usuarios.model';
import { SearchestadoPipe } from '../../pipes/searchestado.pipe';
import { SearchtipoPipe } from '../../pipes/searchtipo.pipe';


@Component({
  selector: 'app-list-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule, NewPersonalComponent, EditarUsuariosComponent, EditarUsuarioComponent, NewUsuarioComponent, SearchpersonaPipe, SearchestadoPipe, SearchtipoPipe],
  templateUrl: './list-usuarios.component.html',
  styleUrl: './list-usuarios.component.css'
})
export default class ListUsuariosComponent {
  personas: Persona[] = [];  // Aquí se almacenarán los personas
  usuarios: any[] = [];  // Aquí se almacenarán los usuarios
  
  edit_user: Persona | null = null; 
  p: number = 1;
  modalService = inject(ModalFormService)
  usuariosService = inject(AddUsuarioService)
  editarUsuarioService = inject(EditarUsuarioService)
  deletePersona = inject(DeleteUsuarioService)
  habilitarUsuario = inject(HabilitarUsuarioService);
  personaService = inject(PersonasService)
  id: number = 0;
  nombre: string = '';
  pdfUrl: SafeResourceUrl | undefined;

  searchValue: string = '';
  openModalPdf: boolean = false;
  selectEstado: string = "2";
  selectedTipo: string = 'todos';

  Administrador: string = 'administrador';
  Publico: string = 'publico';
  Todos: string = 'todos';

  openModNewUser: boolean = false;

  constructor(private authService: AuthService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
     // Suscríbete a los cambios en el servicio
     this.personaService.personas$.subscribe(personas => {
      this.personas = personas; // Actualiza la lista de personas
    });
    // Llamamos al método getUsers() cuando el componente se inicialice
    this.getPersonas();
    this.getUsuarios();


  }




  

  getPersonas(): void {
    this.authService.getPersonas().subscribe(
      (data) => {
        this.personas = data;  // Asigna los datos recibidos a la variable users
        //console.log('personas: back: ',data);  // Para verificar que los usuarios han sido obtenidos correctamente
      },
      (error) => {+
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  getUsuarios(): void {
    this.authService.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;  // Asigna los datos recibidos a la variable users
        //console.log('usuarios: back: ',data);  // Para verificar que los usuarios han sido obtenidos correctamente
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  obtenerIdPersona(id: number){
    this.personaService.getPersonaPorId(id).subscribe(
      (data) =>{
        
          this.edit_user = data;

          if (this.edit_user) {
            const usuario = this.usuarios.find(u => u.persona && u.persona.id_persona === this.edit_user?.id_persona);
            console.log('username list', usuario?.username);
            console.log('id usuario desde lista de personas: ',usuario.id_usuario)
            this.editarUsuarioService.cambiarValorNombre(usuario?.username || '');
            this.seleccionarUsuario(usuario?.id_usuario || 0);
          }
          
      }
    )
  }


  openModalEditar(): void{
    this.modalService.openModalEditUser();
  }

  openModalEditUser(){
    this.editarUsuarioService.openModal();
  }
 // Llama al servicio para abrir el modal
 openModal() {
  this.usuariosService.openModal(); // Abre el modal
}

seleccionarPersona(id: number,) {
  this.usuariosService.setIdPersona(id);
}

seleccionarUsuario(id: number,) {
  this.editarUsuarioService.setIdUsuario(id);
}

tieneUsuario(personaId: number): boolean {
  return this.usuarios.some(usuario => usuario.persona && usuario.persona.id_persona === personaId);
}


actualizarEstadoPersona() {
  const payload = { id_persona: this.id}; // Crea el objeto JSON con el atributo id_persona
  this.deletePersona.actualizarPersona(payload).subscribe({
    next: (respuesta) => {
      console.log('Persona actualizada:', respuesta);
      this.getPersonas();
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

habilitarPersona(){
  const payload = { id_persona: this.id}; // Crea el objeto JSON con el atributo id_persona
  console.log('id desde hab',this.id)
  this.habilitarUsuario.habilitarPersona(payload).subscribe({
    next: (respuesta) => {
      console.log('Persona actualizada:', respuesta);
      this.getPersonas();
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

obtenerIdPersonaDelete(id_persona: number, nombre: string) {
  this.nombre = nombre;
  console.log(id_persona)
  this.id = id_persona;

  const modal = document.getElementById('popup-modal');
    
  if (modal) {
    // Agrega las clases necesarias para mostrar el modal
    modal.classList.add('block'); // Asegúrate de que el modal tenga la clase para mostrarlo
    modal.classList.remove('hidden'); // Elimina la clase que oculta el modal
  }
}


obtenerIdPersonaHabilitar(id_persona: number, nombre: string) {
  this.nombre = nombre;
  console.log(id_persona)
  this.id = id_persona;

  const modal = document.getElementById('popup-modal-one');
    
  if (modal) {
    // Agrega las clases necesarias para mostrar el modal
    modal.classList.add('block'); // Asegúrate de que el modal tenga la clase para mostrarlo
    modal.classList.remove('hidden'); // Elimina la clase que oculta el modal
  }
}

obtenerId(id_persona: number){
  console.log('id_persona obteniada de la lista: ', id_persona)
this.personaService.cambiarValor(id_persona)
}

openModalNew(){
  this.modalService.openModalNewUser();
}

//metodos para el pdf
openModalpdf() {
  // Lógica para abrir el modal
  this.openModalPdf = true;
}

cerrarModalpdf() {
  this.openModalPdf = false;
}

async generarPDF(persona: Persona) {
  try {
    // URL de la imagen (puede ser una URL local o remota)
    const imageUrl = persona.foto; // Asegúrate de que la URL sea válida
    const doc = new jsPDF();

    console.log('Generando PDF para:', persona.nombre);
    
    // Convertir la imagen a Base64
    if(imageUrl != null){
    let base64Image = await this.convertImageToBase64(imageUrl);
      // Verificar si la imagen Base64 está disponible
      if (base64Image) {
        // Ajustar las coordenadas para evitar que la imagen se sobreponga al texto
        doc.addImage(base64Image, 'PNG', 10, 20, 100, 50); // Coordenadas (10, 20) y tamaño (100, 50)
        console.log('Imagen agregada al PDF');
      } else {
        doc.text(`la persona no tien imagen`, 10, 20); // Coordenadas (10, 20) y tamaño (100, 50)
      }
  }
    
    console.log('Imagen convertida a Base64');

    // Crear el documento PDF
    
    doc.setFontSize(18);
    doc.text('Información del Usuario', 10, 10);

  

    // Agregar texto al PDF
    doc.setFontSize(12);
    doc.text(`Nombre: ${persona.nombre} ${persona.ap} ${persona.am}`, 10, 80);  // Ajustar la posición
    doc.text(`Estado: ${persona.estado === 1 ? 'Activo' : 'Inactivo'}`, 10, 90);  // Ajustar la posición
    doc.text(`tipo personal: ${persona.tipo_per}`, 10, 100);  // Ajustar la posición

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


// Método para convertir la imagen de la URL a Base64
convertImageToBase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Permite el acceso a imágenes de otros dominios, si es necesario.

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const base64Image = canvas.toDataURL('image/png');
        resolve(base64Image);
      } else {
        reject('Error al crear el contexto del canvas');
      }
    };

    img.onerror = (error) => {
      console.error('Error al cargar la imagen:', error);
      reject('Error al cargar la imagen desde la URL');
    };

    img.src = url;
  });
}

}

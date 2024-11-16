import { Component, inject } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { NewPersonalComponent } from "../new-personal/new-personal.component";
import { ModalFormService } from '../../../users/services/modal-form.service';
import { EditarUsuariosComponent } from "../editar-usuarios/editar-usuarios.component";
import { AddUsuarioService } from '../../services/add-usuario.service';
import NewUsuarioComponent from '../new-usuario/new-usuario.component';
import { DeleteUsuarioService } from '../../services/delete-usuario.service';
import { HabilitarUsuarioService } from '../../services/habilitar-usuario.service';
import { PersonasService } from '../../services/personas.service';
import { EditarUsuarioService } from '../../services/editar-usuario.service';
import { EditarUsuarioComponent } from "../editar-usuario-password/editar-usuario.component";
import { Persona } from '../../../users/models/edit-user.model';


@Component({
  selector: 'app-list-usuarios',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, NewPersonalComponent, EditarUsuariosComponent, NewUsuarioComponent, EditarUsuarioComponent],
  templateUrl: './list-usuarios.component.html',
  styleUrl: './list-usuarios.component.css'
})
export default class ListUsuariosComponent {
  personas: any[] = [];  // Aquí se almacenarán los personas
  usuarios: any[] = [];  // Aquí se almacenarán los usuarios
  personasFiltradasPoTipo_per: any[] = [];
  personasFiltradasPorEstado: any[] = [];
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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
     // Suscríbete a los cambios en el servicio
     this.personaService.personas$.subscribe(personas => {
      this.personas = personas; // Actualiza la lista de personas
    });
    // Llamamos al método getUsers() cuando el componente se inicialice
    this.getPersonas();
    this.getUsuarios();

     // Escuchar cambios en el tipo de persona seleccionado
     this.personaService.tipoPersona$.subscribe(tipo => {
      this.filtrarPersonas(tipo);
    });
// Escuchar cambios en el estado de persona seleccionado
    this.personaService.estadoSeleccionado$.subscribe(tipo => {
      this.filtrarPersonasPorEstado(tipo);
    });
  }

  filtrarPersonas(tipo: string) {
    if (tipo === 'Todos') {
      this.personasFiltradasPoTipo_per = this.personas;
    } else {
      this.personasFiltradasPoTipo_per = this.personas.filter(persona => persona.tipo_per === tipo);
    }
  }

  filtrarPersonasPorEstado(tipo: any) {
    // Convierte tipo a un número explícitamente
    const tipoNumero = Number(tipo);
    console.log('tipo persona desde list: ', tipoNumero);
    
    if (tipoNumero === 2) {
      this.personasFiltradasPoTipo_per = this.personas;
    } else {
      this.personasFiltradasPoTipo_per = this.personas.filter(persona => persona.estado === tipoNumero);
    }
  }
  

  getPersonas(): void {
    this.authService.getPersonas().subscribe(
      (data) => {
        this.personas = data;  // Asigna los datos recibidos a la variable users
        this.personasFiltradasPoTipo_per = data;
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
}

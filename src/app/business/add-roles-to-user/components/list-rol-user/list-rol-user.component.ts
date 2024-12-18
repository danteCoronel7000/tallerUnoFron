import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { rol, usuario, UsuarioAll } from '../../models/rol-user.model';
import { RolToUsuarioService } from '../../services/rol-to-usuario.service';
import { SearchrolPipe } from '../../pipes/searchrol.pipe';
import { SearchusuarioPipe } from '../../pipes/searchusuario.pipe';
import { AsignoasigPipe } from '../../pipes/asignoasig.pipe';

@Component({
  selector: 'app-list-rol-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxPaginationModule, SearchrolPipe, SearchusuarioPipe, AsignoasigPipe],
  templateUrl: './list-rol-user.component.html',
  styleUrl: './list-rol-user.component.css'
})
export class ListRolUserComponent {
  p: number = 1;
  pp: number = 1;
  searchValueUsuario: string = '';
  searchValueRol: string = '';

  asigNoasig: string = '2';
  
  listUsuarios: usuario[] = [];
  listRoles: rol[] = [];
  listRolesSeleccionados: number[] = [];
  usuarioSeleccionadoPorId: UsuarioAll | null = null;
  
  idUsuarioSeleccionado: number = 0;
  
  constructor(private rolUsuarioService: RolToUsuarioService) {
    this.getRolesAndUsuarios();
  }
  
  getRolesAndUsuarios(): void {
    //obtenemos los usuarios
    this.rolUsuarioService.getUsuarios().subscribe(
      (data) => {
        this.listUsuarios = data;
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
    //obtenemos los roles
    this.rolUsuarioService.getRoles().subscribe(
      (data) => {
        this.listRoles = data;
        console.log('data rolesf: ', data)
      },
      (error) => {
        console.error('Error al obtener los roles:', error);
      }
    );
  }
  
  addRolesToUsuario(): void {
    this.rolUsuarioService.addRolesToUsuario(this.idUsuarioSeleccionado, this.listRolesSeleccionados).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error('Error al obtener los roles:', error);
      }
    )
  }
  
  toggleRol(rolId: number, target: EventTarget | null): void {
    //limpiamos la lista de roles
    this.listRolesSeleccionados = [];
  
    if (target && target instanceof HTMLInputElement) {  // Verificar que target no sea null y que sea un HTMLInputElement
      if (target.checked) {
        // Si está marcado, agrega el ID
        if (!this.listRolesSeleccionados.includes(rolId)) {
          this.listRolesSeleccionados.push(rolId);
        }
        this.addRolesToUsuario();
      } else {
        // Si está desmarcado, elimina el ID
        this.listRolesSeleccionados = this.listRolesSeleccionados.filter(
          (id) => id !== rolId
        );
      }
    }
    console.log('IDs seleccionados:', this.listRolesSeleccionados);
  }
  
  // Método para manejar la selección de usuario
  isRolRelacionado(rolId: number): boolean {
    if (!this.usuarioSeleccionadoPorId || !Array.isArray(this.usuarioSeleccionadoPorId.rolesList)) {
      return false; // Si no hay un usuario seleccionado o rolesList no es un array, retorna falso
    }
  
    console.log('roles imprimidos: ', this.usuarioSeleccionadoPorId.rolesList);
    
    // Verifica si el rolId está en la lista de roles relacionados con el usuario seleccionado
    const isRolEncontrado = this.usuarioSeleccionadoPorId.rolesList.some((rol) => rol.id_rol === rolId);
    console.log(`Rol ${rolId} ${isRolEncontrado ? 'encontrado' : 'no encontrado'} en la lista de roles.`);
    
    return isRolEncontrado;
  }
  
  
  seleccionarUsuarioPorId(id: number): void {
    this.idUsuarioSeleccionado = id;
    console.log(id)
  
    //cargamos la variable usuarioSeleccionadoPorId con el usuario seleccionado
    this.rolUsuarioService.getUsuariosPorId(id).subscribe(
      (data) => {
        this.usuarioSeleccionadoPorId = data;
        console.log('usuarioSeleccionadoPorId: ',this.usuarioSeleccionadoPorId)
      }
    );
  }
  
}

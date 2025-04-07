import { Component } from '@angular/core';
import { Menu, Rol, RolAll } from '../../models/list-menu-rol.model';
import { MenuRolService } from '../../services/menu-rol.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchmenuPipe } from '../../pipes/searchmenu.pipe';
import { SearchrolPipe } from '../../pipes/searchrol.pipe';
import { AsignoasigPipe } from '../../pipes/asignoasig.pipe';

@Component({
  selector: 'app-list-menu-rol',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxPaginationModule, SearchmenuPipe, SearchrolPipe, AsignoasigPipe],
  templateUrl: './list-menu-rol.component.html',
  styleUrl: './list-menu-rol.component.css'
})
export class ListMenuRolComponent {
  p: number = 1;
pp: number = 1;
searchValueRoles: string = '';
searchValueMenus: string = '';

asigNoasig: string = '403';
listRoles: Rol[] = [];
listMenus: Menu[] = [];
listMenusFiltrados: Menu[] = [];
listMenusSeleccionados: number[] = [];
rolSeleccionadoPorId: RolAll | null = null;

idRolSeleccionado: number = 0;

constructor(private menurolService: MenuRolService) {
  this.getMenusAndRoles();
}

getMenusAndRoles(): void {
  //obtenemos los roles
  this.menurolService.getRoles().subscribe(
    (data) => {
      this.listRoles = data;
    },
    (error) => {
      console.error('Error al obtener los roles:', error);
    }
  );
  //obtenemos los menus
  this.menurolService.getMenus().subscribe(
    (data) => {
      //this.listMenus = data;
    },
    (error) => {
      console.error('Error al obtener los menus:', error);
    }
  );
}

addMenusToRol(): void {
  this.menurolService.addMenusToRol(this.idRolSeleccionado, this.listMenusSeleccionados).subscribe(
    (data) => {
      console.log(data);
    },
    (error) => {
      console.error('Error al añadir los menus al rol:', error);
    }
  );
}

toggleMenu(menuId: number, target: EventTarget | null): void {
  //limpiamos la lista de menus seleccionados
  this.listMenusSeleccionados = [];

  if (target && target instanceof HTMLInputElement) {  // Verificar que target no sea null y que sea un HTMLInputElement
    if (target.checked) {
      // Si está marcado, agrega el ID
      if (!this.listMenusSeleccionados.includes(menuId)) {
        this.listMenusSeleccionados.push(menuId);
      }
      this.addMenusToRol();
    } else {
      // Si está desmarcado, elimina el ID
      this.listMenusSeleccionados = this.listMenusSeleccionados.filter(
        (id) => id !== menuId
      );
    }
  }
  console.log('IDs seleccionados:', this.listMenusSeleccionados);
}

// Método para manejar la selección de rol
isMenuRelacionado(menuId: number): boolean {
  if (!this.rolSeleccionadoPorId || !this.rolSeleccionadoPorId.menusList) {
    return false; // Si no hay un rol seleccionado, retorna falso
  }
  // Verifica si el menuId está en la lista de menus relacionados con el rol seleccionado
  return this.rolSeleccionadoPorId.menusList.some((menu) => menu.id_menu === menuId);
}

seleccionarRolPorId(id: number): void {
  this.idRolSeleccionado = id;

  //cargamos la variable rolSeleccionadoPorId con el rol seleccionado
  this.menurolService.getRolesPorId(id).subscribe(
    (data) => {
      this.rolSeleccionadoPorId = data;
    }
  );

  this.asigNoasig = '2';
  //obtenemos los menus filtrados
  this.menurolService.getMenusFiltrados(id, this.asigNoasig).subscribe(
    (data) => {
      this.listMenusFiltrados = data;
      console.log('lista de roles filtrados: ', data)
    },
    (error) => {
      console.error('Error al obtener los roles:', error);
    }
  );
}

onFiltroChage(filtro: string){
  //obtenemos los roles filtrados
  this.menurolService.getMenusFiltrados(this.idRolSeleccionado, filtro).subscribe(
    (data) => {
      this.listMenusFiltrados = data;
      console.log('lista de roles filtrados: ', data)
    },
    (error) => {
      console.error('Error al obtener los roles:', error);
    }
  );
}

}

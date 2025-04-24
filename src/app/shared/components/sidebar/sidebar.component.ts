import { Component, computed, effect, inject, Input, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MenuService } from '../../../business/users/services/menu.service';
import { CommonModule } from '@angular/common';
import { RolesService } from '../../../business/users/services/roles.service';
import { AccordionService } from '../../../business/users/services/accordion.service';
import { AuthService } from '../../../core/services/auth.service';
import { SharedService } from '../../services/shared.service';
import { ModalFormService } from '../../../business/users/services/modal-form.service';
import { Menus } from '../../models/models-shared.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export default class SidebarComponent {
  
  listOfMenusByRole: Menus[] = [];
  openDropdowns: { [key: number]: boolean } = {}; // Estado de los dropdowns
  

  constructor(public authService: AuthService, private sharedService: SharedService, private router: Router){
    
    effect(() => {
      const selectedRole = this.sharedService.rolSelect();
      this.listOfMenusByRole = this.getMenusByRoleName(selectedRole);
      console.log('Rol cambiado:', selectedRole);
      console.log('Menús actualizados:', this.listOfMenusByRole);
    });
  }


  getMenusByRoleName(roleName: string | null): any[] {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const userData = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
      
      // Verifica si el usuario tiene roles y menús asociados
      if (userData && userData.rolesList) {
        // Busca el rol que coincide con el nombre del rol seleccionado
        const role = userData.rolesList.find((r: any) => r.nombre === roleName);
  
        if (role && role.menusList) {
          // Retorna los menús asociados a ese rol
          return role.menusList;
        }
      }
    }
    // Si no se encuentra el rol o no hay menús asociados, retorna un array vacío
    return [];
  }


  // Verifica si algún enlace del submenú está activo
  isMenuActive(menu: any): boolean {
    return menu.procesosList.some((proceso: any) =>
      this.router.isActive(proceso.enlace, false)
    );
  }

    // Alternar dropdown
    toggleDropdown(menuId: number) {
      this.openDropdowns[menuId] = !this.openDropdowns[menuId];
    }

}


import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/menu.service';
import { RolesService } from '../../services/roles.service';
import { AccordionService } from '../../services/accordion.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {

 
  roles: string[] = [];
  selectedRole: string | null = null;
  roleService=inject(RolesService)
  accordionService = inject(AccordionService)
  authService = inject(AuthService);

  constructor() {}

  ngOnInit(): void {
    this.roles = this.getUserRoles();
  }

  getUserRoles(): string[] {
    const userData = this.authService.getLoggedInUser();
    
    if (userData()) {
      const roles = userData()?.rolesList || [];
      return roles.map((role: any) => role.nombre);
    }

    const userDataFromStorage = this.authService.getLoggedInUserFromStorage();
    if (userDataFromStorage) {
      const roles = userDataFromStorage.rolesList || [];
      return roles.map((role: any) => role.nombre);
    }

    return [];
  }

  // Método para seleccionar un rol y emitir el evento
  selectRole(role: string): void {
    this.roleService.selectRole(role);
    this.selectedRole = role;  // Asignar el rol seleccionado
  }

  openDrop(){
    this.roles = this.getUserRoles();
  }

  //metodo que abre o cierra el accordion del side bar
  openAccordion() {
    this.accordionService.toggleAccordionSideBar();
  }
  
} 
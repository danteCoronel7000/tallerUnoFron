import { Component, inject } from '@angular/core';
import { CommonModule} from '@angular/common';
import { DateComponent } from '../../utils/date/date.component';
import { AuthService } from '../../../core/services/auth.service';
import { SharedService } from '../../services/shared.service';
import { Menus } from '../../models/models-shared.model';
import { ModalFormService } from '../../../business/users/services/modal-form.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, DateComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{

  roles: string[] = [];
  modalService = inject(ModalFormService);
  selectedRoleInDropdown: string | null = null;
  listOfMenusByRole: Menus[] = [];
  openDropdowns: { [key: number]: boolean } = {}; // Estado de los dropdowns
  nombreRolSelect: string = '';
  

  constructor(public authService: AuthService, private sharedService: SharedService){
    
    
  }



  longinSingIn(){
    if(this.authService.isAuthenticated()){
      this.authService.logout();
      // Resetea la selección del dropdown
    this.selectedRoleInDropdown = null;
    this.listOfMenusByRole = [];
    }else{
      this.modalService.openModal();
    }
    
  }

  // Signal que contiene los menús calculados


 

  selecionarRol(role: string): void {
    this.nombreRolSelect = role;
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.setItem('nombreRolSelect', this.nombreRolSelect);
    }
    this.selectedRoleInDropdown = role;
    this.sharedService.updateRolSelect(role);
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
  
  openDropdownRoles(){
    this.roles = this.getUserRoles();
  }
  
    // Reiniciar estados de dropdowns
    resetDropdownStates() {
      this.openDropdowns = {};
    }

}

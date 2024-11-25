import { Component, inject} from '@angular/core';
import { DateComponent } from "../../utils/date/date.component";
import { LoginComponent } from "../../../business/users/components/login/login.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ModalFormService } from '../../../business/users/services/modal-form.service';
import { Menus } from '../../models/models-shared.model';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, LoginComponent, RouterOutlet, DateComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export default class LayoutComponent {

  roles: string[] = [];
  botonLog: boolean = true;
  nombreBoton: string = 'Iniciar Sesion'
  modalService = inject(ModalFormService);
  selectedRoleInDropdown: string | null = null;
  listOfMenusByRole: Menus[] = [];
  openDropdowns: { [key: number]: boolean } = {}; // Estado de los dropdowns
  selectedFile: any;
  

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
    this.selectedRoleInDropdown = role;
    this.listOfMenusByRole = this.getMenusByRoleName(this.selectedRoleInDropdown)
    console.log('list ade menus by role: ',this.listOfMenusByRole)
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

    // Alternar dropdown
    toggleDropdown(menuId: number) {
      this.openDropdowns[menuId] = !this.openDropdowns[menuId];
    }
  
    // Reiniciar estados de dropdowns
    resetDropdownStates() {
      this.openDropdowns = {};
    }


    //actualizar foto de ususario
    onFileSelected(event: any) {
      const file = event.target.files[0]; // Capturar el archivo seleccionado
    
      if (file) {
        this.selectedFile = file; // Almacenar el archivo seleccionado en la variable 'selectedFile'
        console.log('Archivo seleccionado:', this.selectedFile);
      }
    }

    actualizarFotoPersona() {
      
          // Crear un FormData
          const formData = new FormData();
  
          // Si se ha seleccionado una imagen, adjuntarla
          if (this.selectedFile) {
              formData.append('file', this.selectedFile);
          }
  
          // Verifica el contenido de formData antes de enviarlo
          console.log('Datos a enviar como FormData:', formData);

          const id_persona = this.authService.getIdPersonaLog();
  
         formData.append('id_persona', id_persona.toString())

           // Enviar el FormData al servicio
    this.sharedService.actualizarFotoPersona(formData).subscribe({
      next: (response) => {
        console.log('Foto actualizada exitosamente:', response.url);
        this.authService.setFotoUsuario(response.url)
      },
      error: (error) => {
        console.error('Error al actualizar la foto:', error);
      }
    });
  }
}

import { Component} from '@angular/core';
import { LoginComponent } from "../../../business/users/components/login/login.component";
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/shared.service';
import { HeaderComponent } from '../header/header.component';
import SidebarComponent from '../sidebar/sidebar.component';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [LoginComponent, RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export default class LayoutComponent{
  selectedFile: any;
  

  constructor(public authService: AuthService, private sharedService: SharedService){}



      
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
    this.authService.setFotoUsuarioLocalStorage(response.url)
  },
  error: (error) => {
    console.error('Error al actualizar la foto:', error);
  }
});
}

   //actualizar foto de ususario
   onFileSelected(event: any) {
    const file = event.target.files[0]; // Capturar el archivo seleccionado
  
    if (file) {
      this.selectedFile = file; // Almacenar el archivo seleccionado en la variable 'selectedFile'
      console.log('Archivo seleccionado:', this.selectedFile);
    }
  }
}

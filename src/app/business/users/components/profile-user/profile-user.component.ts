import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ModalFormService } from '../../services/modal-form.service';
import { AuthService } from '../../../../core/services/auth.service';
import { UserPhotoService } from '../../services/user-photo.service';
import { FileUploadService } from '../../services/file-upload.service';
import { ResponseMessage } from '../../models/response-message';

@Component({
  selector: 'app-profile-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.css'
})
export class ProfileUserComponent implements OnInit{

  userPhoto: string | null = null;
  selectedFile: File | null = null;
  message: string= '';

  modalService = inject(ModalFormService);
  date = inject(AuthService);
  authService = inject(AuthService);
  fileUploadService = inject(FileUploadService)

  // Inyectamos el servicio para manejar la imagen del usuario
  userPhotoService = inject(UserPhotoService);
  

  ngOnInit(): void {
    // Recuperar la foto del usuario al inicializar el componente
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    this.authService.photoUser = localStorage.getItem('photoUser') || '';
    this.authService.nombreCompleto = localStorage.getItem('nombreCompleto') || '';
    }

  }

  constructor(){
  }



  // Método que se ejecuta cuando se selecciona un archivo
  onFileSelectede(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Convertimos el archivo a una URL para mostrarlo
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        this.userPhotoService.updateUserPhoto(result);
      };
      reader.readAsDataURL(file);
    }
  }

  openModal() {
    this.modalService.openModal();
  }

  logOut(){
    this.authService.logout();
  }




  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Archivo seleccionado:', this.selectedFile);
    }
  }




   // Método para subir el archivo
   onUpload() {
    if (this.selectedFile) {
      console.log('Subiendo archivo:', this.selectedFile);
      this.fileUploadService.uploadFile(this.selectedFile).subscribe(
        (response: ResponseMessage) => {
          console.log('Respuesta del servidor:', response);
          this.message = response.message;
        },
        (error) => {
          console.error('Error al subir el archivo:', error);
          this.message = `Error: ${error.message}`;
        }
      );
    } else {
      this.message = 'Por favor, seleccione un archivo antes de subir.';
    }
  }

}

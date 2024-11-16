import { Component, inject, OnInit } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { ResponseMessage } from '../../models/response-message';
import { CommonModule, NgIf } from '@angular/common';
import { UserPhotoService } from '../../services/user-photo.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileSelectEvent } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ProfileService } from '../../services/profile.service';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { GestionarUsuariosComponent } from "../gestionar-usuarios/gestionar-usuarios.component";

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, NgIf, RouterOutlet, FormsModule, ReactiveFormsModule, ButtonModule, RouterModule, InputTextModule, InputNumberModule, CardModule, FileUploadModule, GestionarUsuariosComponent],
    providers: [MessageService],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export default class FileUploadComponent implements OnInit{

  formUser!: FormGroup;
  isSaveInProgress: boolean = false;
  edit: boolean = false;

  selectedFile: File | null = null;
  message: string | null = null;
  userPhotoUrl: string = 'simple-user-default.png'; // Ruta de imagen por defecto

  fileUploadService = inject(FileUploadService);
  userPhotoService = inject(UserPhotoService);
  

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private profileService:  ProfileService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){
    this.formUser = this.fb.group({
      id: [null],
      image: [null]
    });
  }

  ngOnInit(){
    // Recupera la URL de la foto del perfil cuando se inicializa el componente
    this.userPhotoUrl = this.userPhotoService.getUserPhoto() || 'simple-user-default.png';

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.edit = true;
      this.getBookById(+id); // Ya no necesitas `id!`, porque has verificado que `id` existe
    }
}

  // Método que se ejecuta cuando se selecciona un archivo
  onFileSelected(event: FileSelectEvent) {
    this.selectedFile = event.files[0];
  }

  // Método para subir el archivo
  onUpload() {
    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile).subscribe(
        (response: ResponseMessage) => {
          console.log('Respuesta del servidor:', response);
          this.message = response.message;

          // Aquí debes obtener la URL de la imagen subida que te devuelve el backend
          //const updatedPhotoUrl = response.fileUrl || 'simple-user-default.png'; // 'fileUrl' es solo un ejemplo, depende del backend
          const updatedPhotoUrl = 'simple-user-default.png'; // 'fileUrl' es solo un ejemplo, depende del backend
          
          // Actualiza la URL de la foto del usuario y guárdala en el servicio
          this.userPhotoService.saveUserPhoto(updatedPhotoUrl);
          this.userPhotoUrl = updatedPhotoUrl;  // Actualiza la imagen mostrada
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

  getBookById(id: number) {
    this.profileService.getBookById(id).subscribe({
      next: (foundBook) => {
        this.formUser.patchValue(foundBook);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No encontrado',
        });
        this.router.navigateByUrl('/');
      },
    });
  }

  changeImage(event: FileSelectEvent) {
    this.selectedFile = event.files[0];
    if (!this.selectedFile) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Seleccione una imagen e intente nuevamente',
      });
      return;
    }
    this.profileService.updateBookImage(this.formUser.value.id, this.selectedFile).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Libro actualizado correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigate(['/noauth']);
      },
      error: () => {
        this.isSaveInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Revise el archivo seleccionado',
        });
      },
    });
  }

  createBook() {
    if (this.formUser.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return;
    }
    if (!this.selectedFile) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Seleccione una imagen e intente nuevamente',
      });
      return;
    }
    this.isSaveInProgress = true;
    this.profileService
      .createBook(this.formUser.value, this.selectedFile)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Guardado',
            detail: 'Libro guardado correctamente',
          });
          this.isSaveInProgress = false;
          this.router.navigateByUrl('/');
        },
        error: () => {
          this.isSaveInProgress = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Revise los campos e intente nuevamente',
          });
        },
      });
  }

  
  updateBook() {
    if (this.formUser.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return;
    }
    this.isSaveInProgress = true;
    this.profileService.updateBook(this.formUser.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Libro actualizado correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.isSaveInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Revise los campos e intente nuevamente',
        });
      },
    });
  }
}

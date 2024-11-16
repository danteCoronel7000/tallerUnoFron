import { Component, inject } from '@angular/core';
import { GestionarUsuariosComponent } from "../gestionar-usuarios/gestionar-usuarios.component";
import { MediaService } from '../../services/media.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-file.component.html',
  styleUrl: './select-file.component.css'
})
export default class SelectFileComponent {
mediaService = inject(MediaService)
url?: string;

upload(event: any){
  const file = event.target.files[0];

  if(file){
    const formData = new FormData();
    formData.append('file', file);
    this.mediaService.uploadFile(formData).subscribe(response =>{
      console.log('response: ', response)
      this.url = response.url;
    })
  }
}
}

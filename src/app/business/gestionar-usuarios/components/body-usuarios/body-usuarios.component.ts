import { Component } from '@angular/core';
import ListUsuariosComponent from "../list-usuarios/list-usuarios.component";

@Component({
  selector: 'app-body-usuarios',
  standalone: true,
  imports: [ListUsuariosComponent],
  templateUrl: './body-usuarios.component.html',
  styleUrl: './body-usuarios.component.css'
})
export class BodyUsuariosComponent {

}

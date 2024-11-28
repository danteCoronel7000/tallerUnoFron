import { Component } from '@angular/core';
import { HeadUsuariosComponent } from "../head-usuarios/head-usuarios.component";
import ListUsuariosComponent from "../list-usuarios/list-usuarios.component";

@Component({
  selector: 'app-layout-usuarios',
  standalone: true,
  imports: [HeadUsuariosComponent, ListUsuariosComponent],
  templateUrl: './layout-usuarios.component.html',
  styleUrl: './layout-usuarios.component.css'
})
export default class LayoutUsuariosComponent {

}

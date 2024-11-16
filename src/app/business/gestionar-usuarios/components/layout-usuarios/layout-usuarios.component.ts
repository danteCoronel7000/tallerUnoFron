import { Component } from '@angular/core';
import { HeadUsuariosComponent } from "../head-usuarios/head-usuarios.component";
import { BodyUsuariosComponent } from "../body-usuarios/body-usuarios.component";

@Component({
  selector: 'app-layout-usuarios',
  standalone: true,
  imports: [HeadUsuariosComponent, BodyUsuariosComponent],
  templateUrl: './layout-usuarios.component.html',
  styleUrl: './layout-usuarios.component.css'
})
export default class LayoutUsuariosComponent {

}

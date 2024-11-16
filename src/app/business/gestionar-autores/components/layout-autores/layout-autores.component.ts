import { Component } from '@angular/core';
import { HeadAutoresComponent } from "../head-autores/head-autores.component";
import { BodyAutoresComponent } from "../body-autores/body-autores.component";

@Component({
  selector: 'app-layout-autores',
  standalone: true,
  imports: [HeadAutoresComponent, BodyAutoresComponent],
  templateUrl: './layout-autores.component.html',
  styleUrl: './layout-autores.component.css'
})
export default class LayoutAutoresComponent {

}

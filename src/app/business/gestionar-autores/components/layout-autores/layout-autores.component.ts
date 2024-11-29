import { Component } from '@angular/core';
import { HeadAutoresComponent } from "../head-autores/head-autores.component";
import { ListAutoresComponent } from "../list-autores/list-autores.component";

@Component({
  selector: 'app-layout-autores',
  standalone: true,
  imports: [HeadAutoresComponent, ListAutoresComponent],
  templateUrl: './layout-autores.component.html',
  styleUrl: './layout-autores.component.css'
})
export default class LayoutAutoresComponent {

}

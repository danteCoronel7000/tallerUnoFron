import { Component } from '@angular/core';
import { ListAutoresComponent } from "../list-autores/list-autores.component";

@Component({
  selector: 'app-layout-autores',
  standalone: true,
  imports: [ListAutoresComponent],
  templateUrl: './layout-autores.component.html',
  styleUrl: './layout-autores.component.css'
})
export default class LayoutAutoresComponent {

}

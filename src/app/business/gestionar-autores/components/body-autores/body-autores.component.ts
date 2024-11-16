import { Component } from '@angular/core';
import { ListAutoresComponent } from "../list-autores/list-autores.component";

@Component({
  selector: 'app-body-autores',
  standalone: true,
  imports: [ListAutoresComponent],
  templateUrl: './body-autores.component.html',
  styleUrl: './body-autores.component.css'
})
export class BodyAutoresComponent {

}

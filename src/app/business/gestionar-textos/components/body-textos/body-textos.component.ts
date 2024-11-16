import { Component } from '@angular/core';
import { ListTextosComponent } from "../list-textos/list-textos.component";

@Component({
  selector: 'app-body-textos',
  standalone: true,
  imports: [ListTextosComponent],
  templateUrl: './body-textos.component.html',
  styleUrl: './body-textos.component.css'
})
export class BodyTextosComponent {

}

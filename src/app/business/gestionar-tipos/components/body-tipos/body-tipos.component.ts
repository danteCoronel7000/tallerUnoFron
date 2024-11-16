import { Component } from '@angular/core';
import { ListTiposComponent } from "../list-tipos/list-tipos.component";

@Component({
  selector: 'app-body-tipos',
  standalone: true,
  imports: [ListTiposComponent],
  templateUrl: './body-tipos.component.html',
  styleUrl: './body-tipos.component.css'
})
export class BodyTiposComponent {

}

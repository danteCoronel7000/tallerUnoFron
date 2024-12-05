import { Component } from '@angular/core';
import { ListTiposComponent } from "../list-tipos/list-tipos.component";

@Component({
  selector: 'app-layout-tipos',
  standalone: true,
  imports: [ListTiposComponent],
  templateUrl: './layout-tipos.component.html',
  styleUrl: './layout-tipos.component.css'
})
export default class LayoutTiposComponent {

}

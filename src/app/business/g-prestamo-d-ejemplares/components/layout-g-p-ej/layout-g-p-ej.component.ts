import { Component } from '@angular/core';
import { GPrestEjemplaresComponent } from "../g-prest-ejemplares/g-prest-ejemplares.component";
import { DetPrestamoComponent } from "../det-prestamo/det-prestamo.component";

@Component({
  selector: 'app-layout-g-p-ej',
  standalone: true,
  imports: [GPrestEjemplaresComponent, DetPrestamoComponent],
  templateUrl: './layout-g-p-ej.component.html',
  styleUrl: './layout-g-p-ej.component.css'
})
export default class LayoutGPEjComponent {

}

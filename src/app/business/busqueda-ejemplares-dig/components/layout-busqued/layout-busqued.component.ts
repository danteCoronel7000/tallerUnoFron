import { Component } from '@angular/core';
import { GBusquedaEjemComponent } from "../g-busqueda-ejem/g-busqueda-ejem.component";

@Component({
  selector: 'app-layout-busqued',
  standalone: true,
  imports: [GBusquedaEjemComponent],
  templateUrl: './layout-busqued.component.html',
  styleUrl: './layout-busqued.component.css'
})
export default class LayoutBusquedComponent {

}

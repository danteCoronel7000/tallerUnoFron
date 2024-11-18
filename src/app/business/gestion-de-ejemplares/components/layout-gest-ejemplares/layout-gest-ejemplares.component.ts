import { Component } from '@angular/core';
import { ListTextComponent } from "../list-text/list-text.component";
import { DetEjemplaresComponent } from "../det-ejemplares/det-ejemplares.component";

@Component({
  selector: 'app-layout-gest-ejemplares',
  standalone: true,
  imports: [ListTextComponent, DetEjemplaresComponent],
  templateUrl: './layout-gest-ejemplares.component.html',
  styleUrl: './layout-gest-ejemplares.component.css'
})
export default class LayoutGestEjemplaresComponent {

}

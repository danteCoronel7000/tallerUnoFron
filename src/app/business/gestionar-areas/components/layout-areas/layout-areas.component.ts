import { Component } from '@angular/core';
import { ListAreasComponent } from "../list-areas/list-areas.component";

@Component({
  selector: 'app-layout-areas',
  standalone: true,
  imports: [ListAreasComponent],
  templateUrl: './layout-areas.component.html',
  styleUrl: './layout-areas.component.css'
})
export default class LayoutAreasComponent {

}

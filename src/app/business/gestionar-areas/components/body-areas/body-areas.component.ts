import { Component } from '@angular/core';
import { ListAreasComponent } from "../list-areas/list-areas.component";

@Component({
  selector: 'app-body-areas',
  standalone: true,
  imports: [ListAreasComponent],
  templateUrl: './body-areas.component.html',
  styleUrl: './body-areas.component.css'
})
export class BodyAreasComponent {

}

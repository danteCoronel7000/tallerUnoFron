import { Component } from '@angular/core';
import { HeadAraesComponent } from "../head-areas/head-araes.component";
import { BodyAreasComponent } from "../body-areas/body-areas.component";

@Component({
  selector: 'app-layout-areas',
  standalone: true,
  imports: [HeadAraesComponent, BodyAreasComponent],
  templateUrl: './layout-areas.component.html',
  styleUrl: './layout-areas.component.css'
})
export default class LayoutAreasComponent {

}

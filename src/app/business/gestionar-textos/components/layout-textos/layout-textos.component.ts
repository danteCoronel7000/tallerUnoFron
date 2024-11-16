import { Component } from '@angular/core';
import { HeadTextosComponent } from "../head-textos/head-textos.component";
import { BodyTextosComponent } from "../body-textos/body-textos.component";

@Component({
  selector: 'app-layout-textos',
  standalone: true,
  imports: [HeadTextosComponent, BodyTextosComponent],
  templateUrl: './layout-textos.component.html',
  styleUrl: './layout-textos.component.css'
})
export default class LayoutTextosComponent {

}

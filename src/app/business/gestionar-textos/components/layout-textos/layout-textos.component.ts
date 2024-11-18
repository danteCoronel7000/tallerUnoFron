import { Component } from '@angular/core';
import { HeadTextosComponent } from "../head-textos/head-textos.component";
import { ListTextosComponent } from "../list-textos/list-textos.component";

@Component({
  selector: 'app-layout-textos',
  standalone: true,
  imports: [HeadTextosComponent, ListTextosComponent],
  templateUrl: './layout-textos.component.html',
  styleUrl: './layout-textos.component.css'
})
export default class LayoutTextosComponent {

}

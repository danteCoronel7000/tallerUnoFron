import { Component } from '@angular/core';
import { HeadTiposComponent } from "../head-tipos/head-tipos.component";
import { BodyTiposComponent } from "../body-tipos/body-tipos.component";

@Component({
  selector: 'app-layout-tipos',
  standalone: true,
  imports: [HeadTiposComponent, BodyTiposComponent],
  templateUrl: './layout-tipos.component.html',
  styleUrl: './layout-tipos.component.css'
})
export default class LayoutTiposComponent {

}

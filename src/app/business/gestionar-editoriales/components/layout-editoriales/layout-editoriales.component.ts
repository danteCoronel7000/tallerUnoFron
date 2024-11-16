import { Component } from '@angular/core';
import { HeadAraesComponent } from "../../../gestionar-areas/components/head-areas/head-araes.component";
import { HeadEditorialesComponent } from "../head-editoriales/head-editoriales.component";
import { BodyEditorialesComponent } from "../body-editoriales/body-editoriales.component";

@Component({
  selector: 'app-layout-editoriales',
  standalone: true,
  imports: [HeadAraesComponent, HeadEditorialesComponent, BodyEditorialesComponent],
  templateUrl: './layout-editoriales.component.html',
  styleUrl: './layout-editoriales.component.css'
})
export default class LayoutEditorialesComponent {
}

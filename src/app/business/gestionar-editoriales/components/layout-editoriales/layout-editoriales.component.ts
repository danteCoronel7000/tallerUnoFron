import { Component } from '@angular/core';
import { ListEditorialesComponent } from "../list-editoriales/list-editoriales.component";

@Component({
  selector: 'app-layout-editoriales',
  standalone: true,
  imports: [ListEditorialesComponent],
  templateUrl: './layout-editoriales.component.html',
  styleUrl: './layout-editoriales.component.css'
})
export default class LayoutEditorialesComponent {
}

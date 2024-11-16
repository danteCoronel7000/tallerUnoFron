import { Component } from '@angular/core';
import { ListEditorialesComponent } from "../list-editoriales/list-editoriales.component";

@Component({
  selector: 'app-body-editoriales',
  standalone: true,
  imports: [ListEditorialesComponent],
  templateUrl: './body-editoriales.component.html',
  styleUrl: './body-editoriales.component.css'
})
export class BodyEditorialesComponent {

}

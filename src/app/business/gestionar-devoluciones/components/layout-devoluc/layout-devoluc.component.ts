import { Component } from '@angular/core';
import { ListDevolucComponent } from "../list-devoluc/list-devoluc.component";

@Component({
  selector: 'app-layout-devoluc',
  standalone: true,
  imports: [ListDevolucComponent],
  templateUrl: './layout-devoluc.component.html',
  styleUrl: './layout-devoluc.component.css'
})
export default class LayoutDevolucComponent {
  
}

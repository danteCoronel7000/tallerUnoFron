import { Component } from '@angular/core';
import { HeadMenusComponent } from "../head-menus/head-menus.component";
import { ListMenusComponent } from "../list-menus/list-menus.component";

@Component({
  selector: 'app-layout-menus',
  standalone: true,
  imports: [HeadMenusComponent, ListMenusComponent],
  templateUrl: './layout-menus.component.html',
  styleUrl: './layout-menus.component.css'
})
export default class LayoutMenusComponent {

}

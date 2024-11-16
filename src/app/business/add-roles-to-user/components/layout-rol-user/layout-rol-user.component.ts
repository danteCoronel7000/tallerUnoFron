import { Component } from '@angular/core';
import { ListRolUserComponent } from "../list-rol-user/list-rol-user.component";

@Component({
  selector: 'app-layout-rol-user',
  standalone: true,
  imports: [ListRolUserComponent],
  templateUrl: './layout-rol-user.component.html',
  styleUrl: './layout-rol-user.component.css'
})
export default class LayoutRolUserComponent {

}

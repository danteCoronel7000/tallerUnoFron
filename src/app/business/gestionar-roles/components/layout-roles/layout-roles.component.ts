import { Component } from '@angular/core';
import { HeadRolesComponent } from "../head-roles/head-roles.component";
import { ListRolesComponent } from "../list-roles/list-roles.component";

@Component({
  selector: 'app-layout-roles',
  standalone: true,
  imports: [HeadRolesComponent, ListRolesComponent],
  templateUrl: './layout-roles.component.html',
  styleUrl: './layout-roles.component.css'
})
export default class LayoutRolesComponent {

}

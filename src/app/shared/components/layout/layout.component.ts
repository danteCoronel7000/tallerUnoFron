import { Component } from '@angular/core';
import { AppComponent } from "../../../app.component";
import { DateComponent } from "../../utils/date/date.component";
import { RolesComponent } from "../../../business/users/components/roles/roles.component";
import { ProfileUserComponent } from "../../../business/users/components/profile-user/profile-user.component";
import { LoginComponent } from "../../../business/users/components/login/login.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [AppComponent, DateComponent, RolesComponent, ProfileUserComponent, LoginComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export default class LayoutComponent {

}

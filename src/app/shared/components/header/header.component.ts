import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { RolesComponent } from '../../../business/users/components/roles/roles.component';
import { DateComponent } from '../../utils/date/date.component';
import { ProfileUserComponent } from "../../../business/users/components/profile-user/profile-user.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, DateComponent, RolesComponent, ProfileUserComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{

}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LoginComponent } from '../../../business/users/components/login/login.component';
import { NewPersonalComponent } from "../../../business/gestionar-usuarios/components/new-personal/new-personal.component";
import  SidebarComponent  from "../sidebar/sidebar.component";
import NewUsuarioComponent from "../../../business/gestionar-usuarios/components/new-usuario/new-usuario.component";
import { AppComponent } from "../../../app.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, LoginComponent, SidebarComponent, NewUsuarioComponent, AppComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export default class LayoutComponent {

}

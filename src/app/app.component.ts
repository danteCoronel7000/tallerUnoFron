import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewPersonalComponent } from "./business/gestionar-usuarios/components/new-personal/new-personal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'proy-bibliotecas';
}

import { Component} from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-gestionar-usuarios',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './gestionar-usuarios.component.html',
  styleUrl: './gestionar-usuarios.component.css'
})
export class GestionarUsuariosComponent {
  users: any[] = [];  // Aquí se almacenarán los usuarios
  p: number = 1;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Llamamos al método getUsers() cuando el componente se inicialice
    this.getUsers();
  }

  getUsers(): void {
    this.authService.getPersonas().subscribe(
      (data) => {
        this.users = data;  // Asigna los datos recibidos a la variable users
        //console.log(this.users);  // Para verificar que los usuarios han sido obtenidos correctamente
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

}

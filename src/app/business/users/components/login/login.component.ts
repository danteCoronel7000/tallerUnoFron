import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalFormService } from '../../services/modal-form.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  modalService = inject(ModalFormService);
  nombrePersona: string | null = ' ';

  formAuth = signal<FormGroup>(
    new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required])
    })
  );


  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    // Accessing form values
    const username = this.formAuth().get('username')?.value;
    const password = this.formAuth().get('password')?.value;

    if (this.formAuth().valid) {
      this.authService.login(username, password).subscribe({
        next: () => {
          console.log('Inicio de sesión exitoso');
          // Redirecciona al dashboard
          this.router.navigate(['/inicio']);
          this.authService.isAuth = true;
         // Obtener los datos del usuario desde el servicio (signal)
         /*
         const userData = this.authService.getLoggedInUser();
         console.log('Datos del usuario logueado en el componente:', userData());  // Verificar signal
 
         // Si el signal es null, intentar recuperar desde localStorage
         if (!userData()) {
           const userDataFromStorage = this.authService.getLoggedInUserFromStorage();
           console.log('Datos del usuario desde localStorage:', userDataFromStorage);
         }
    */
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
          // Manejar el error, como mostrar un mensaje al usuario
        }
      });

      this.modalService.closeModal();
      const modal = document.getElementById('modal');
      if (modal) {
        modal.classList.add('hidden');
      }
    } else {
      console.error('Formulario no válido');
    }
    
    const userDataFromStorage = this.authService.getLoggedInUserFromStorage();

    if (userDataFromStorage) {
      const nombrePerCompleto = `${userDataFromStorage.persona.nombre} ${userDataFromStorage.persona.ap} ${userDataFromStorage.persona.am}`;
      this.nombrePersona = nombrePerCompleto;
      this.authService.nombreCompleto = this.nombrePersona
      console.log(nombrePerCompleto)
    }
  }


  closeModal() {
    this.modalService.closeModal();
  }

  // Método para obtener los datos del usuario desde el servicio
  getUserData(): void {
    const userData = this.authService.getLoggedInUser(); // Invocar la señal
    console.log('Datos del usuario logueado:', userData);
    // Puedes hacer algo con los datos del usuario aquí
  }
}

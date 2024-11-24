import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddUsuarioService } from '../../services/add-usuario.service';
import { CommonModule, getLocaleExtraDayPeriodRules } from '@angular/common';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-new-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-usuario.component.html',
  styleUrl: './new-usuario.component.css'
})
export class NewUsuarioComponent {
  usuarioForm: FormGroup;
  isOpen = false;

  constructor(private fb: FormBuilder, private usuariosService: AddUsuarioService) {
    this.usuarioForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirm_password: ['', Validators.required],
      persona: this.fb.group({
        id_persona: ['']
      }),
    }, { validators: this.passwordMatchValidator() }); // Aplica el validador al grupo

    this.usuariosService.modalState$.subscribe(state => {
      this.isOpen = state;
    });
  }

  crearUsuario() {
    if (this.usuarioForm.valid) {
      const nuevoUsuario = this.usuarioForm.value;
      
      // Eliminar la confirmación de contraseña antes de enviar el objeto
      delete nuevoUsuario.confirm_password;
  
      // Asignar el id de la persona al objeto
      nuevoUsuario.persona.id_persona = this.usuariosService.idPersona();
  
      console.log('Datos a enviar:', this.usuariosService.idPersona());
      // Mostrar el objeto en la consola
      console.log('Datos a enviar:', nuevoUsuario);
  
      // Enviar el objeto al backend
      this.usuariosService.crearUsuario(nuevoUsuario).subscribe(
        (response: any) => {
          console.log('Usuario creado:', response);
        },
        (error: any) => {
          console.error('Error al crear el usuario:', error);
        }
      );
    }
  }

  close() {
    this.usuariosService.closeModal(); // Cierra el modal
  }


  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirm_password')?.value;
  
      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }


}

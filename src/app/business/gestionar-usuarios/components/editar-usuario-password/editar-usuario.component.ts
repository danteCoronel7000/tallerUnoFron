import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditarUsuarioService } from '../../services/editar-usuario.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent implements OnInit {

  usuarioForm: FormGroup;
  isOpen = false;

  constructor(private fb: FormBuilder, private editarUsuarioService: EditarUsuarioService) {
    this.usuarioForm = this.fb.group({
      id_usuario: [''],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirm_password: ['', Validators.required],
    }, { validators: this.passwordMatchValidator() });

    this.editarUsuarioService.modalState$.subscribe(state => {
      this.isOpen = state;
      console.log(this.isOpen)
    });
  }
  ngOnInit(): void {

    this.editarUsuarioService.valorActual.subscribe((valor) => {
      this.usuarioForm.patchValue({
        username: valor
      })
    });
  }

  actualizarUsuario() {
    if (this.usuarioForm.valid) {
      const nuevoUsuario = this.usuarioForm.value;
      
      // Eliminar la confirmación de contraseña antes de enviar el objeto
      delete nuevoUsuario.confirm_password;
      console.log('id usuario desde modal esdiotar',this.editarUsuarioService.idUsuario())
  nuevoUsuario.id_usuario = this.editarUsuarioService.idUsuario();
      // Mostrar el objeto en la consola
      console.log('Datos a enviar:', nuevoUsuario);
  
      // Enviar el objeto al backend
      this.editarUsuarioService.editarUsuario(nuevoUsuario).subscribe(
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
    this.editarUsuarioService.closeModal(); // Cierra el modal
  }


  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirm_password')?.value;
  
      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }


}

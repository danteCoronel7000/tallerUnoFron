import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  // Signal que contiene el rol seleccionado
  selectedRole: WritableSignal<string | null> = signal(null);

  // Método para actualizar el rol
  selectRole(role: string): void {
    this.selectedRole.set(role);
  }
}

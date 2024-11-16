import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserPhotoService {



  private photoUrl: string | null = null;

  private photoKey = 'userPhoto';

  constructor() {}

  // Guardar la foto de perfil en localStorage
  saveUserPhoto(photoUrl: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.photoKey, photoUrl);
    }
  }

  // Obtener la foto de perfil de localStorage
  getUserPhoto(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.photoKey);
    }
    return null;
  }

  // Verificar si estamos en el navegador
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

    // Signal para manejar la imagen del usuario
    userPhoto = signal<string | null>(null);

    // Método para actualizar la imagen del usuario
    updateUserPhoto(photoUrl: string | null): void {
      this.userPhoto.set(photoUrl);
    }
      
}

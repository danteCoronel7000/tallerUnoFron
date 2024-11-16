import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() { }

  selectedRole: string = ''; // Signal para el rol seleccionado

  // Método para obtener menús basados en el rol del usuario
  getMenusByRole(roleName: string | null): any[] {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const userData = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
      
      // Verifica si el usuario tiene roles y menús asociados
      if (userData && userData.rolesList) {
        // Busca el rol que coincide con el nombre del rol seleccionado
        const role = userData.rolesList.find((r: any) => r.nombre === roleName);
  
        if (role && role.menusList) {
          // Retorna los menús asociados a ese rol
          return role.menusList;
        }
      }
    }
    // Si no se encuentra el rol o no hay menús asociados, retorna un array vacío
    return [];
  }
  

}

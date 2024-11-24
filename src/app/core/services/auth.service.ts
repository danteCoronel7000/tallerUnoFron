import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Usuario } from '../../business/users/models/Usuarios.Model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authService(): Usuario | null {
    throw new Error('Method not implemented.');
  }

  private LOGIN_URL = 'http://localhost:9090/api/usuarios/login'
  private url_personas = 'http://localhost:9090/api/personas/all'
  private url_usuarios = 'http://localhost:9090/api/usuarios/all'
  private tokenKey = 'authToken'
  nombreCompleto: string = '';
  nombreRol: string = '';
  isAuth: boolean = false;
  photoUser: string = '';
  id_personaLogueada: number = 0;
    // Signal para almacenar el usuario logueado
    loggedInUser: WritableSignal<Usuario | null> = signal<Usuario | null>(null);

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.LOGIN_URL, {username, password}).pipe(
      tap(response => {
        console.log("response: ", response);
        this.nombreCompleto = response.persona.nombre + ' ' + response.persona.ap + ' ' + response.persona.am;
        this.nombreRol = response.rolesList.map(rol => rol.nombre).join(', ');
        console.log(this.nombreRol);
        this.photoUser = response.persona.foto
        this.id_personaLogueada = response.persona.id_persona;
        this.loggedInUser.set(response);
  
        //console.log('Usuario logueado en el servicio:', this.loggedInUser());
  
        // Aquí es donde guardas el usuario en localStorage
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
          localStorage.setItem('photoUser', response.persona.foto);
          localStorage.setItem('nombreCompleto', this.nombreCompleto);
          localStorage.setItem('loggedInUser', JSON.stringify(response));
          localStorage.setItem('nombreRol', this.nombreRol);
          localStorage.setItem('id_persona_log', this.id_personaLogueada.toString());
        }
  
        if (response.token) {
          //console.log(response.token);
          this.setToken(response.token);
        }
      })
    );
  }
  

  // Método para obtener el signal del usuario logueado
  getLoggedInUser(): WritableSignal<Usuario | null> {
    return this.loggedInUser;
  }

  getNombreRoles(){
    return this.nombreRol;
  }

  private setToken(token: string): void{
    localStorage.setItem(this.tokenKey, token);
  }


private  getToken(): string | null{
    if(typeof window !== 'undefined'){
      return localStorage.getItem(this.tokenKey);
    }else{
      return null;
    }    
  }

  isAuthenticated(): boolean{
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp; // Obtén el valor de exp del token
      const expDate = new Date(exp * 1000); // Convierte exp a milisegundos
      return Date.now() < expDate.getTime(); // Compara con la fecha actual
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return false; // Devuelve false si hay un error
    }
  }

  logout(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      // Eliminar el token del localStorage si está disponible
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem('photoUser');
      localStorage.removeItem('nombreCompleto');
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('nombreRol');
      localStorage.removeItem('id_persona_log');
      console.log("se removio correctamente el local storage")
    }
    
    this.loggedInUser.set(null); // Limpiar el estado del usuario
    // Redirigir al usuario a la página de login o limpiar el estado
    this.router.navigate(['/login']);
  }

  getLoggedInUserFromStorage(): Usuario | null {
    // Verifica si estás en el navegador
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem('loggedInUser');
      
      if (storedUser) {
        //console.log('Usuario recuperado desde localStorage:', JSON.parse(storedUser));
        return JSON.parse(storedUser);
      } else {
        console.log('No se encontraron datos del usuario en localStorage.');
        return null;
      }
    } else {
      console.log('localStorage no está disponible en este entorno.');
      return null;
    }
  }
  

  getPersonas(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url_personas);
  }

  getUsuarios(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url_usuarios);
  }

  getFoto(): string {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return localStorage.getItem('photoUser') || '';
    }
    return ''; // Valor predeterminado si no estás en el navegador
  }

  setFotoUsuario(url: string): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('photoUser', url);
    }
  }
  
  getNombre(): string {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return localStorage.getItem('nombreCompleto') || '';
    }
    return ''; // Valor predeterminado si no estás en el navegador
  }
  
getNombreRol(): string {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const nombreRol = localStorage.getItem('nombreRol') || '';
    return nombreRol;
  }
  return ''; // Valor predeterminado si no estás en el navegador
}

getIdPersonaLog(): number{
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const recuperado: number = parseInt(localStorage.getItem('id_persona_log') || '0', 10);
    return recuperado;
  }
  return 0; // Valor predeterminado si no estás en el navegador
}
}
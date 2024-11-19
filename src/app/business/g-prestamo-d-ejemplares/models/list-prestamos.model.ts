export interface MPrestamo {
    id_mprestamo: number;
    fecha: string;
    fechaini: string;
    fechafin: string;
    tipopres: number;
    estado: number;
    realiza: Realiza;
    presta: Presta;
  }
  
  export interface Realiza {
    id_dato: number;
    ci: string;
    persona: Persona;
  }
  
  export interface Presta {
    id_usuario: number;
    username: string;
    password: string;
    token: string;
    estado: number;
    persona: Persona;
  }
  
  export interface Persona {
    id_persona: number;
    nombre: string;
    ap: string;
    am: string;
    estado: number;
  }

  export interface Datos {
    id_dato: number,
    ci: string
  }
  
  export interface DetPrestamoDTO {
    codinv: number;        // Código del inventario
    titejemplar: string;   // Título del ejemplar
    estado: number;        // Estado del préstamo
  }
  
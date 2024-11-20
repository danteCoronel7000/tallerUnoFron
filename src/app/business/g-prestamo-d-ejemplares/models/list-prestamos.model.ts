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

  export interface MPrestamoCrear {
    id_mprestamo: number;
    fecha: string;
    fechaini: string;
    fechafin: string;
    tipopres: number;
    estado: number;
    id_dato: number;
    id_usuario: number;
    listEjemplares: {}[];
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

  export interface EjemplarDtoPPrestamos {
    id_ejemplar: number;
    codinv: number;
    titulo: string;
    disponible: number;
    estado: number;
  }
  
  export interface Usuario {
    id_usuario: number;
    username: string;
    password: string;
    token: string;
    estado: number;
    persona: Persona;
    rolesList: Rol[];
  }

  export interface Proceso {
    id_proceso: number;
    nombre: string;
    enlace: string;
    estado: number;
  }
  
  export interface Menu {
    id_menu: number;
    nombre: string;
    estado: number;
    procesosList: Proceso[];
  }
  
  export interface Rol {
    id_rol: number;
    nombre: string;
    estado: number;
    menusList: Menu[];
  }
export interface Personas {
    id_persona: number;
    // Agrega otros atributos de la entidad Personas si es necesario
  }
  
  export interface Usuarios {
    id_usuario: number;
    username: string;
    password: string;
    persona: Personas; // Aquí se asocia la entidad Persona
  }




  // Interface for the Persona object
export interface Persona {
  id_persona: number;
  nombre: string;
  ap: string;
  am: string;
  genero: string;
  estado: number;
  tipo_per: string;
  foto: string | null;
  datos: any; // You can specify a more precise type if needed
  telefonos: any[]; // You can specify a more precise type if needed
}

// Interface for the Proceso object
export interface Proceso {
  id_proceso: number;
  nombre: string;
  enlace: string;
  estado: number;
}

// Interface for the Menu object
export interface Menu {
  id_menu: number;
  nombre: string;
  estado: number;
  procesosList: Proceso[];
}

// Interface for the Rol object
export interface Rol {
  id_rol: number;
  nombre: string;
  estado: number;
  menusList: Menu[];
}

// Interface for the Usuario object
export interface Usuario {
  id_usuario: number;
  username: string;
  password: string;
  token: string;
  estado: number;
  persona: Persona;
  rolesList: Rol[];
}

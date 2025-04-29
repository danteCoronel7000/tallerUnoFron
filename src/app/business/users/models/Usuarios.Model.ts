// models/user.model.ts
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
  
  export interface Persona {
    id_persona: number;
    nombre: string;
    ap: string;
    am: string;
    genero: string;
    estado: number;
    tipo_per: string;
    image?: Image
  }
  
  export interface Image {
    id: number;
    name: string;
    imageUrl: string;
    imageId: string;
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
  
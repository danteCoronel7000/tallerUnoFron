export interface Procesos {
    id_proceso: number;
    nombre: string;
    enlace: string;
    estado: number;
  }
  
  export interface Menus {
    id_menu: number;
    nombre: string;
    estado: number;
    procesosList: Procesos[];
  }
  
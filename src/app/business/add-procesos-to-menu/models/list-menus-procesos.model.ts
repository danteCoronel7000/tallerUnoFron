export interface proceso{
    id_proceso: number;
    nombre: string;
    estado: number;
}
export interface menu {
    id_menu: number;
    nombre: string;
}


export interface MenuAll {
    id_menu: number;
    nombre: string;
    estado: number;
    procesosList: ProcesoAll[]; // Lista de procesos asociados
  }
  
  export interface ProcesoAll {
    id_proceso: number;
  }
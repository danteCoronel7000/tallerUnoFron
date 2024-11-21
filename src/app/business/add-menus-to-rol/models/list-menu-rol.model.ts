export interface Rol{
    id_rol: number;
    nombre: string;
    estado: number;
}
export interface Menu {
    id_menu: number;
    nombre: string;
    estado: number;
    asig: number;
}


export interface RolAll {
    id_rol: number;
    nombre: string;
    estado: number;
    menusList: MenuAll[]; // Lista de procesos asociados
  }
  
  export interface MenuAll {
    id_menu: number;
  }
export interface rol{
    id_rol: number;
    nombre: string;
    estado: number;
    asig: number;
}
export interface usuario {
    id_usuario: number;
    username: string;
}


export interface UsuarioAll {
  id_usuario: number;
  username: string;
  password: string;
  token: string;
  estado: number;
  rolesList: { id_rol: number }[];
}

interface Persona {
  id_persona: number;
  nombre: string;
  ap: string;
  am: string;
  genero: string;
  estado: number;
  tipo_per: string;
  foto: string | null;
  datos: any; // Puedes especificar un tipo más adecuado si tienes más detalles sobre la estructura de "datos"
  telefonos: string[]; // Suponiendo que "telefonos" es un array de cadenas, ajusta si es necesario
}
  
  export interface RolAll {
    id_rol: number;
  }
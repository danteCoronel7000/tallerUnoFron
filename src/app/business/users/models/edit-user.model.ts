export interface Persona {
    id_persona: number;
    nombre: string;
    ap: string;
    am: string;
    genero: string;
    estado: number;
    tipo_per: string;
    foto: string;
    datos: Datos;
    telefonos: Telefono[];
  }
  
  export interface Datos {
    id_dato: number;
    ci: string;
  }
  
  export interface Telefono {
    id_telefono: number;
    numero: number;
    id_persona: number;
  }
  
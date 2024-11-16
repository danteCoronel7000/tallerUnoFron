export interface Personas {
    id_persona: number;
    nombre: string;
    ap: string;
    am: string;
    genero: string;
    estado: number;
    tipo_per: string;
    foto: string;
    datos: {
      id_dato: number;
      ci: string;
    };
    telefonos: {
      id_telefono: number;
      numero: string;
    }[];
  }
  
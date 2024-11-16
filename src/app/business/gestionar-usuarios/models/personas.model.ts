export interface PersonasEditar{
    id_persona: number;
    nombre: string;
    ap: string;
    am: string;
    genero: string;
    estado: number;
    tipo_per: string;
    foto: string;
  }

  export interface ListPersonas {
    id_persona: number;
    nombre: string;
    am: string;
    estado: number;
    ap: string;
    foto: string | null;
  }
import { Image } from "./image.model";

export interface PersonasEditar{
    id_persona: number;
    nombre: string;
    ap: string;
    am: string;
    genero: string;
    estado: number;
    tipo_per: string;
    image?: Image
  }

  export interface ListPersonas {
    id_persona: number;
    nombre: string;
    am: string;
    estado: number;
    ap: string;
    image?: Image
  }
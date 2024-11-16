import { Persona } from "./Persona.model";

export interface User {
    
     id_usuario: number;
    
    username: string;
    
    password: string;
    
    estado: number;

    persona?: Persona;
  }
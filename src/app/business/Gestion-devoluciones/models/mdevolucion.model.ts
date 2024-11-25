export interface Persona {
    id_persona: number;
    nombre: string;
    ap: string;
    am: string;
    genero: string;
    estado: number;
    tipo_per: string;
    foto: string;
  }
  
  export interface Usuario {
    id_usuario: number;
    username: string;
    password: string;
    token: string | null;
    estado: number | null;
    persona: Persona;
  }
  
  export interface Reserva {
    id_usuario: number;
    username: string;
    password: string;
    token: string | null;
    estado: number | null;
    persona: Persona;
  }
  
  export interface Realiza {
    id_dato: number;
    ci: string;
    persona: Persona;
  }
  
  export interface MPrestamo {
    id_mprestamo: number;
    fecha: string;
    fechaini: string;
    fechafin: string;
    tipopres: number;
    estado: number;
    realiza: Realiza;
  }
  
  export interface Texto {
    id_texto: number;
    titulo: string;
    resumen: string;
    isbn: string;
    edicion: string | null;
    fechapub: string;
    url: string | null;
    estado: number | null;
  }
  
  export interface Anula {
    id_usuario: number;
    username: string;
    password: string;
    token: string;
    estado: number;
    persona: Persona;
  }
  
  export interface Ejemplar {
    id_ejemplar: number;
    codinv: number;
    disponible: number;
    estado: number;
    texto: Texto;
    anula: Anula;
  }
  
  export interface MDevolucion {
    id_mdevolucion: number;
    fecha: string;
    estado: number;
    reserva: Reserva;
    mprestamo: MPrestamo;
    ejemplaresList: Ejemplar[];
  }
  

  export interface EjemplarPrestamoDTOByidprestamo {
    idEjemplar: number; // ID del ejemplar
    codinv: number;     // Código de inventario
    estado: number;     // Estado de la relación many-to-many
    titulo: string;     // Título del texto relacionado
  }
export interface Texto {
    id_texto: number;
    titulo: string;
    resumen: string;
    isbn: string;
    edicion: string | null;
    fechapub: string; // Fecha en formato ISO (YYYY-MM-DD)
    url: string;
    estado: number | null;
    autoresList: Autor[];
    area: Area;
    editorial: Editorial;
  }
  
  export interface Autor {
    id_autor: number;
    nombre: string;
    ap: string; // Apellido paterno
    am: string; // Apellido materno
    genero: string;
    estado: number; // Activo o inactivo
  }
  
  export interface Area {
    id_area: number;
    nombre: string;
    estado: number; // Activo o inactivo
  }
  
  export interface Editorial {
    id_editorial: number;
    nombre: string;
    estado: number; // Activo o inactivo
  }

  export interface Tipo {
    id_tipo: number;
    nombre: string;
    estado: number;
    sw: number;
}


export interface Ejemplares{
  id_ejemplar: number;
  disponible: number;
  estado: number;
}
  
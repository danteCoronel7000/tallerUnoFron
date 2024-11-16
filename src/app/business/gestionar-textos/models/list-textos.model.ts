export interface Texto {
    id_texto?: number;
    titulo: string;
    resumen: string;
    isbn: string;
    edicion: number;
    fechapub: string;
    estado: number | null;
    autores?: [];
    area?: number;
    editorial?: number;
}
//texto que se enviara al backend
export interface TextoBack {
    id_texto?: number;
    titulo: string;
    resumen: string;
    isbn: string;
    edicion: number;
    fechapub: string;
    url?: string;
    estado: number;
    autoresList: { id_autor: number }[]; 
    area:id_ar;
    editorial: id_edi;
}

export interface id_ar {
    id_area: number;
}
export interface id_edi {
    id_editorial: number;
}
export interface id_au {
    id_autor: number;
}
export interface TextoNotUndefined {
    id_texto: number;
    titulo: string;
    resumen: string;
    isbn: string;
    edicion: number;
    fechapub: string;
    estado: number;
    autoresList: Autor[];
    area: Area;
    editorial: Editorial;
}

export interface Autor {
    id_autor: number;
    nombre: string;
    ap: string;
    am: string;
    genero: string;
    estado: number;
}

export interface Area {
    id_area: number;
    nombre: string;
    estado: number;
}

export interface Editorial {
    id_editorial: number;
    nombre: string;
    estado: number;
}

export interface Tipo {
    id_tipo: number;
    nombre: string;
    estado: number;
    sw: number;
}

export interface AutorNotUndefined {
    id_autor: number;   // Identificador único del autor
    nombre: string;     // Nombre del autor
    ap: string;         // Apellido paterno del autor
    am: string;         // Apellido materno del autor
    genero: string;     // Género del autor (por ejemplo, "Masculino", "Femenino")
    estado: number;     // Estado del autor (por ejemplo, 1 para activo, 0 para inactivo)
}
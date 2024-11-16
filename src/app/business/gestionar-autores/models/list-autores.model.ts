export interface Autor {
    id_autor: number;   // Identificador único del autor
    nombre: string;     // Nombre del autor
    ap: string;         // Apellido paterno del autor
    am: string;         // Apellido materno del autor
    genero: string;     // Género del autor (por ejemplo, "Masculino", "Femenino")
    estado: number;     // Estado del autor (por ejemplo, 1 para activo, 0 para inactivo)
}

export interface AutorNotUndefined {
    id_autor: number;   // Identificador único del autor
    nombre: string;     // Nombre del autor
    ap: string;         // Apellido paterno del autor
    am: string;         // Apellido materno del autor
    genero: string;     // Género del autor (por ejemplo, "Masculino", "Femenino")
    estado: number;     // Estado del autor (por ejemplo, 1 para activo, 0 para inactivo)
}
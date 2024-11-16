
export class Datos {
  id_dato: number = 0;
  ci: string = '';

  constructor(id_dato: number = 0, ci: string = '') {
    this.id_dato = id_dato;
    this.ci = ci;
  }
}

export class Telefono {
  numero: string = '';

  constructor(numero: string = '') {
    this.numero = numero;
  }
}

export class Personas {
  id_persona: number = 0;
  nombre: string = '';
  ap: string = '';
  am: string = '';
  genero: string = '';
  estado: number = 0;
  tipo_per: string = '';
  foto: string = '';
  telefonos: Telefono[] = []; // Agregar el arreglo de teléfonos
  datos: Datos = new Datos(); // Agregar la relación con Datos

  constructor(
    id_persona: number = 0,
    nombre: string = '',
    ap: string = '',
    am: string = '',
    genero: string = '',
    estado: number = 0,
    tipo_per: string = '',
    foto: string = '',
    telefonos: Telefono[] = [], // Agregar en el constructor
    datos: Datos = new Datos() // Inicializar la relación con Datos en el constructor
  ) {
    this.id_persona = id_persona;
    this.nombre = nombre;
    this.ap = ap;
    this.am = am;
    this.genero = genero;
    this.estado = estado;
    this.tipo_per = tipo_per;
    this.foto = foto;
    this.telefonos = telefonos; // Inicializar el arreglo de teléfonos
    this.datos = datos; // Inicializar el objeto Datos
  }
}

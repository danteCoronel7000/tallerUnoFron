import { Component, OnInit } from '@angular/core';
import { EjemplarDtoPPrestamos, MPrestamo, MPrestamoCrear, Usuario } from '../../models/list-prestamos.model';
import { PrestEjemplaresService } from '../../services/prest-ejemplares.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchfechaPipe } from '../../pipes/searchfecha.pipe';
import { SearchestPipe } from '../../pipes/searchest.pipe';
import { NgSelectModule } from '@ng-select/ng-select'
import { AuthService } from '../../../../core/services/auth.service';
import { SearchestadoPipe } from '../../pipes/searchestado.pipe';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-g-prest-ejemplares',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxPaginationModule, NgSelectModule, SearchfechaPipe, SearchestPipe, SearchestadoPipe],
  templateUrl: './g-prest-ejemplares.component.html',
  styleUrl: './g-prest-ejemplares.component.css'
})
export class GPrestEjemplaresComponent implements OnInit{
  mainListPrestamos: MPrestamo[] = [];
  listEjemplaresPP: EjemplarDtoPPrestamos[] = [];
  searchValueEstudiante: string = '';
  startDate: string | null = null; // Fecha de inicio seleccionada.
  endDate: string | null = null; // Fecha de fin seleccionada.
  p: number = 1;
  showModal: boolean = false;
  selectEstado: string = '2';
  selectedEjemplares: EjemplarDtoPPrestamos[] = []; // IDs de autores seleccionados
  userLoguado: Usuario | null = null;

  
  pdfUrl: SafeResourceUrl | undefined;
  openModalPdf: boolean = false;


  fecha: string = '';
  fechaini: string = '';
  fechafin: string = '';

  prestamoEjemplar: MPrestamoCrear = {
    id_mprestamo: 0,
    fecha: '',
    fechaini: '',
    fechafin: '',
    tipopres: 0,
    estado: 1,
    id_dato: 0,
    id_usuario: 0,
    listEjemplares: []
  }

  constructor(private prestamosService: PrestEjemplaresService, private authService: AuthService, private sanitizer: DomSanitizer) {
    
  }

  ngOnInit(): void {
    this.getMPrestamos();
    this.getEjemplaresPPDtio();
  }

  getMPrestamos(): void {
    this.prestamosService.getMPrestamo().subscribe(
      (data) => {
        this.mainListPrestamos = data;
        //console.log('mprestamo list: ', data);
      },
      (error) => {
        console.error('Error al obtener los textos:', error);
      }
    );
  }

  getEjemplaresPPDtio(): void {
    this.prestamosService.getEjemplarDtoPP().subscribe(
      (data) => {
        this.listEjemplaresPP = data;
        //console.log('ejemplares list: ', data);
      },
      (error) => {
        console.error('Error al obtener los textos:', error);
      }
    );
  }

  seleccionarTextoPorId(id: number): void {
    console.log(id);
    this.prestamosService.setIdParaListarEjemplar(id);
    this.prestamosService.openListEjemplares();
  }

  onSubmit(): void {
     // Asignar los ejemplares seleccionados completos
     console.log('fecha:',this.fecha)
     
     const userLoguado = this.authService.getLoggedInUserFromStorage()
     if(userLoguado){
      this.prestamoEjemplar.id_usuario = userLoguado?.id_usuario;
     }

  this.prestamoEjemplar.listEjemplares = this.selectedEjemplares;
  
  this.prestamosService.createMprestamo(this.prestamoEjemplar).subscribe(
    (data) =>{
      console.log(data);
    }
  )

  // Imprimir el objeto completo de manera estructurada
  //console.log('Fecha actualizada:', JSON.stringify(this.prestamoEjemplar, null, 2));
  
  }

  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.prestamoEjemplar.fecha = input.value;
    console.log('Fecha actualizada:', this.prestamoEjemplar.fecha);
  }
  
//metodos para el pdf
openModalpdf() {
  // Lógica para abrir el modal
  this.openModalPdf = true;
}

cerrarModalpdf() {
  this.openModalPdf = false;
}

async generarPDF(persona: MPrestamo) {
  try {

    console.log('Generando PDF para:', persona.id_mprestamo);
    
    
    console.log('Imagen convertida a Base64');

    // Crear el documento PDF
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Información del Prestamo', 10, 20);


    // Agregar texto al PDF
    doc.setFontSize(12);
    doc.text(`Nombre: ${persona.realiza.persona.nombre} ${persona.realiza.persona.ap} ${persona.realiza.persona.am}`, 10, 40);  // Ajustar la posición
    doc.text(`Estado: ${persona.estado === 1 ? 'Activo' : 'Inactivo'}`, 10, 50);  // Ajustar la posición
    doc.text(`Fecha: ${persona.fecha}`, 10, 60);  // Ajustar la posición
    doc.text(`Fecha Inicio: ${persona.fechaini}`, 10, 70);  // Ajustar la posición
    doc.text(`Fecha Fin: ${persona.fechafin}`, 10, 80);  // Ajustar la posición

    // Convertir el PDF a un Blob y generar una URL para previsualización
    const blob = doc.output('blob');
    const ulpdf = URL.createObjectURL(blob);
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(ulpdf);
 
    // Abrir el modal para previsualizar
    this.openModalpdf();
    console.log('PDF generado y enviado a nueva ventana');
  } catch (error) {
    console.error('Error al generar el PDF:', error);
  }
}

}

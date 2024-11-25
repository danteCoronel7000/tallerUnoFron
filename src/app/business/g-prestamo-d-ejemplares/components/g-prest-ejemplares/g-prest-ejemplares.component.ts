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

  constructor(private prestamosService: PrestEjemplaresService, private authService: AuthService) {
    
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
}

import { Component, inject, OnInit } from '@angular/core';
import { MPrestamo } from '../../models/list-prestamos.model';
import { PrestEjemplaresService } from '../../services/prest-ejemplares.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-g-prest-ejemplares',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './g-prest-ejemplares.component.html',
  styleUrl: './g-prest-ejemplares.component.css'
})
export class GPrestEjemplaresComponent implements OnInit{


  mainListPrestamos: MPrestamo[] = []; 
  searchValueEst: string = '';
  isOpenModalNew: boolean = false;
  
  p: number = 1;
  showModal: boolean = false;
  
  selectEstado: string = "2";

  prestamosService = inject(PrestEjemplaresService);


  ngOnInit(): void {
      // Obtenemos todos los textos
      this.getMPrestamos();

  
  }

  constructor() {

  }

  getMPrestamos(): void {
      this.prestamosService.getMPrestamo().subscribe(
          (data) => {
              this.mainListPrestamos = data;
              console.log('mprestamo list: ',data)
          },
          (error) => {
              console.error('Error al obtener los textos:', error);
          }
      );
  }

  seleccionarTextoPorId(id: number): void {
      console.log(id)
      this.prestamosService.setIdParaListarEjemplar(id);
      this.prestamosService.openListEjemplares();
    }

    openModalNewEjemplar() {
      this.isOpenModalNew = true;
    }

}

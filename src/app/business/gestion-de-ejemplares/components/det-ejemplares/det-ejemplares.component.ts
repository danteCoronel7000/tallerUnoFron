import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ejemplares } from '../../models/list-text.model';
import { GestEjemplaresService } from '../../services/gest-ejemplares.service';

@Component({
  selector: 'app-det-ejemplares',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './det-ejemplares.component.html',
  styleUrl: './det-ejemplares.component.css'
})
export class DetEjemplaresComponent {

  p: number = 1;

  listEjemplares: Ejemplares[] = [];

  selectEstado: string = "2";

  constructor(public ejemplaresService: GestEjemplaresService ){
    this.ejemplaresService.idSeleccionado$.subscribe(
      (valor) =>{
        this.getEjemplaresPorIdTexto(valor);
      }
    )
  }

  getEjemplaresPorIdTexto(id:number): void {

    this.ejemplaresService.getEjemplaresPorTexto(id).subscribe(
        (data) => {
            this.listEjemplares = data;
            console.log('lista de textos: ', this.listEjemplares)
        },
        (error) => {
            console.error('Error al obtener los textos:', error);
        }
    );
}
}

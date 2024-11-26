import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Area, Editorial, Texto } from '../../models/busqueda.model';
import { NgxPaginationModule } from 'ngx-pagination';
import { DomSanitizer } from '@angular/platform-browser';
import { GestbuscService } from '../../services/gestbusc.service';
import { SearchtituloPipe } from '../../pipes/searchtitulo.pipe';
import { SearchautorPipe } from '../../pipes/searchautor.pipe';
import { SearcheditorialPipe } from '../../pipes/searcheditorial.pipe';
import { SearchareaPipe } from '../../pipes/searcharea.pipe';
import { SearchtipoPipe } from '../../pipes/searchtipo.pipe';

@Component({
  selector: 'app-g-busqueda-ejem',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxPaginationModule, SearchtituloPipe, SearchautorPipe, SearcheditorialPipe, SearchareaPipe, SearchtipoPipe],
  templateUrl: './g-busqueda-ejem.component.html',
  styleUrl: './g-busqueda-ejem.component.css'
})
export class GBusquedaEjemComponent {
searchValueTitulo: string = '';
searchValueAutor: string = '';
selectedEditorial: string = '';
selectedArea: string = '';
selectedTipo: string = '';

p: number = 1;

listEjemplaresDig: Texto[] = [];
editoriales: Editorial[] = [];
areas: Area[] = [];

constructor(private sanitizer: DomSanitizer, private gestbuscService: GestbuscService) {
  this.getTextos();
  //obtenemos los editoriales:
  this.gestbuscService.getEditorial().subscribe(
    (data) => {
        this.editoriales = data;
    }
);
//obtenemos las areas:
this.gestbuscService.getAreas().subscribe(
  (data) => {
      this.areas = data;
  }
);
}


getTextos(): void {
  this.gestbuscService.getTextos().subscribe(
      (data) => {
          this.listEjemplaresDig = data;
      },
      (error) => {
          console.error('Error al obtener los textos:', error);
      }
  );
}

abrirVentana(url: string): void {
  window.open(url, '_blank');
}

}

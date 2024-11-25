import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ejemplar, EjemplarPrestamoDTOByidprestamo, MDevolucion } from '../../models/mdevolucion.model';
import { MdevolucionService } from '../../services/mdevolucion.service';
import { AuthService } from '../../../../core/services/auth.service';
import { SearchfechinifinPipe } from '../../pipes/searchfechinifin.pipe';
import { SearchestudiantePipe } from '../../pipes/searchestudiante.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchnprestPipe } from '../../pipes/searchnprest.pipe';
import { SearchdevuelprestPipe } from '../../pipes/searchdevuelprest.pipe';

@Component({
  selector: 'app-list-devoluc',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxPaginationModule, SearchfechinifinPipe, SearchestudiantePipe, SearchnprestPipe, SearchdevuelprestPipe],
  templateUrl: './list-devoluc.component.html',
  styleUrl: './list-devoluc.component.css'
})
export class ListDevolucComponent {

  listaDevoluciones: MDevolucion[] = [];
  detDevoluciones: EjemplarPrestamoDTOByidprestamo[] = [];
  searchValueEstudiante: string = '';
  numprestasmo: string = '';
  startDate: string = ''; // Fecha de inicio seleccionada.
  endDate: string = ''; // Fecha de fin seleccionada.
  p: number = 1;
  showModal: boolean = false;
  selectEstado: string = '2';
  openDetalle: boolean = false;

  //ids para guardar devoluicones
  id_ejemplarpd: number = 0;
  id_mprestampd: number = 0;
  id_mdevolucion: number = 0;

  fecha: string = '';
  fechaini: string = '';
  fechafin: string = '';



  constructor(private mdevolucionService: MdevolucionService, private authService: AuthService) {
    
  }

  ngOnInit(): void {
    this.getMDevoluciones();
  }

  getMDevoluciones(): void {
    this.mdevolucionService.getMDevolucion().subscribe(
      (data) => {
        this.listaDevoluciones = data;
        //console.log('mprestamo list: ', data);
      },
      (error) => {
        console.error('Error al obtener los textos:', error);
      }
    );
  }


  seleccionarMDevolucionPorId(id_mdevolucion: number, id_mprestamo: number): void {
    this.id_mdevolucion = id_mdevolucion;
    this.id_mprestampd = id_mprestamo;
    this.openDetalle = true;
    this.mdevolucionService.getEjemplaresByMprestamo(id_mprestamo).subscribe(
      (data) =>{
        this.detDevoluciones = data;
      },
      (error) =>{
        console.log('error al obtener datos',error)
      }
    )
  }

  obternerIdEjemplar(id_ejemp: number) {
    this.id_ejemplarpd = id_ejemp;
    }

    guardarDevolucion(){
      console.log('id_ejemplar',this.id_ejemplarpd)
      console.log('id_mpresmo',this.id_mprestampd)

      const id_u: number = this.authService.getIdUsuarioLogueado();
      
      this.mdevolucionService.guardarEstadoDevolucion(this.id_mprestampd, this.id_ejemplarpd, this.id_mdevolucion, id_u).subscribe({
        next: (response) => {
          console.log('Estado actualizado correctamente:', response);
          this.showSuccessModal();  // Verifica si este método se llama correctamente
          this.mdevolucionService.getEjemplaresByMprestamo(this.id_mprestampd).subscribe(
            (data) =>{
              this.detDevoluciones = data;
            }
          );
        },
        error: (error) => {
          console.error('Error al actualizar estado:', error);
        },
        complete: () => {
          console.log('Suscripción completada');
        }
      });
      
    }

    // Método para mostrar un modal de creado con éxito
  showSuccessModal() {
    this.showModal = true;
    setTimeout(() => {
        this.showModal = false;
    }, 1000); // Oculta el modal después de 1 segundo
}
}

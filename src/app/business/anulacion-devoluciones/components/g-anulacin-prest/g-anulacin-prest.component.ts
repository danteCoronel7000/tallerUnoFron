import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { EjemplarPrestamoDTOByidprestamo, MDevolucion } from '../../models/devolucion.model';
import { AnuldevolucionService } from '../../services/anuldevolucion.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchestudiantPipe } from '../../pipes/searchestudiant.pipe';
import { SearchfinifinPipe } from '../../pipes/searchfinifin.pipe';
import { SearchebystadoPipe } from '../../pipes/searchebystado.pipe';

@Component({
  selector: 'app-g-anulacin-prest',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxPaginationModule, SearchestudiantPipe, SearchfinifinPipe, SearchebystadoPipe],
  templateUrl: './g-anulacin-prest.component.html',
  styleUrl: './g-anulacin-prest.component.css'
})
export class GAnulacinPrestComponent {

  
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



  constructor(private anuldevolucionService: AnuldevolucionService, private authService: AuthService) {
    
  }

  ngOnInit(): void {
    this.getMDevoluciones();
  }

  getMDevoluciones(): void {
    this.anuldevolucionService.getMDevolucion().subscribe(
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
    this.anuldevolucionService.getEjemplaresByMprestamo(id_mprestamo).subscribe(
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
      
      this.anuldevolucionService.guardarEstadoDevolucion(this.id_mprestampd, this.id_ejemplarpd, this.id_mdevolucion, id_u).subscribe({
        next: (response) => {
          console.log('Estado actualizado correctamente:', response);
          this.showSuccessModal();  // Verifica si este método se llama correctamente
          this.anuldevolucionService.getEjemplaresByMprestamo(this.id_mprestampd).subscribe(
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

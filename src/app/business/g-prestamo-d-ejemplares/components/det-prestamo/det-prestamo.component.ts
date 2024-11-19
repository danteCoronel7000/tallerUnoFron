import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DetPrestamoDTO } from '../../models/list-prestamos.model';
import { PrestEjemplaresService } from '../../services/prest-ejemplares.service';

@Component({
  selector: 'app-det-prestamo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './det-prestamo.component.html',
  styleUrl: './det-prestamo.component.css'
})
export class DetPrestamoComponent {

  listDetPresatamo: DetPrestamoDTO[] = [];


  constructor(public prestamoService: PrestEjemplaresService){
    this.prestamoService.idSeleccionado$.subscribe(
      (valor) => {
        this.getDetPrestamoPorIdPres(valor);
      }
    )
  }

  getDetPrestamoPorIdPres(id: number): void {
   this.prestamoService.getDetPrestamoDto(id).subscribe(
    (data) =>{
      this.listDetPresatamo = data;
      console.log('detalle prestamo: ',data)
    }
   )
  }

}

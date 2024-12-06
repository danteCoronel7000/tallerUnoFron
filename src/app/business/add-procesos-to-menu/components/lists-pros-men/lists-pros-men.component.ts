import { Component } from '@angular/core';
import { menu, MenuAll, proceso } from '../../models/list-menus-procesos.model';
import { ProcMenuService } from '../../services/proc-menu.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchprocPipe } from '../../pipes/searchproc.pipe';
import { SearchmenuPipe } from "../../pipes/searchmenu.pipe";
import { AsignoasigPipe } from '../../pipes/asignoasig.pipe';

@Component({
  selector: 'app-lists-pros-men',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxPaginationModule, SearchmenuPipe, SearchprocPipe, AsignoasigPipe],
  templateUrl: './lists-pros-men.component.html',
  styleUrl: './lists-pros-men.component.css'
})
export class ListsProsMenComponent {
  p: number = 1;
  pp: number = 1;
  searchValueMenu: string = '';
  searchValueProceso: string = '';

  asigNoasig:string = '2';

  listMenus: menu[] = [];
  listProcesos: proceso[] = [];
  listProcesosSeleccionados: number[] = [];
  menuSeleccionadoPorId: MenuAll | null = null;

  idMenuSeleccionado: number = 0;

  constructor(private procMenuService: ProcMenuService) {
    this.getProcesosAndMenus();
  }


  getProcesosAndMenus(): void {
      //obtenemos los menus
      this.procMenuService.getMenus().subscribe(
        (data) => {
          this.listMenus = data;
        },
        (error) => {
          console.error('Error al obtener los menus:', error);
        }
      );
    //obtenemos los procesos
    this.procMenuService.getProcesos().subscribe(
      (data) => {
        this.listProcesos = data;
      },
      (error) => {
        console.error('Error al obtener los procesos:', error);
      }
    );
  }

  addProcesosToMenu(): void {
    this.procMenuService.addProcesosToMenu(this.idMenuSeleccionado, this.listProcesosSeleccionados).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error('Error al obtener los procesos:', error);
      }
    )
  }


  toggleProceso(procesoId: number, target: EventTarget | null): void {
    //limpiamos la lista de procesos
    this.listProcesosSeleccionados = [];

    if (target && target instanceof HTMLInputElement) {  // Verificar que target no sea null y que sea un HTMLInputElement
      if (target.checked) {
        // Si está marcado, agrega el ID
        if (!this.listProcesosSeleccionados.includes(procesoId)) {
          this.listProcesosSeleccionados.push(procesoId);
        }
        this.addProcesosToMenu();
      } else {
        // Si está desmarcado, elimina el ID
        this.listProcesosSeleccionados = this.listProcesosSeleccionados.filter(
          (id) => id !== procesoId
        );
      }
    }
    console.log('IDs seleccionados:', this.listProcesosSeleccionados);
  }


  // Método para manejar la selección de menú


  isProcesoRelacionado(procesoId: number): boolean {
    if (!this.menuSeleccionadoPorId || !this.menuSeleccionadoPorId.procesosList) {
      
      return false; // Si no hay un menú seleccionado, retorna falso
    }
    // Verifica si el procesoId está en la lista de procesos relacionados con el menú seleccionado
    return this.menuSeleccionadoPorId.procesosList.some((proceso) => proceso.id_proceso === procesoId);
  }

  seleccionarMenuPorId(id: number): void {
    this.idMenuSeleccionado = id;

    //cargamos la variable menuSeleccionadoPorId con el menu seleccionado
    this.procMenuService.getMenusPorId(id).subscribe(
      (data) => {
        this.menuSeleccionadoPorId = data;
      }
    )

  }

}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Area, Autor, Editorial, Texto, Tipo } from '../../models/list-text.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GestEjemplaresService } from '../../services/gest-ejemplares.service';
import { SearchtextPipe } from '../../pipes/searchtext.pipe';
import { EditorialesppPipe } from '../../pipes/editorialespp.pipe';
import { EstadoppPipe } from '../../pipes/estadopp.pipe';
import { AreasppPipe } from '../../pipes/areaspp.pipe';
import { TiposppPipe } from '../../pipes/tipospp.pipe';

@Component({
    selector: 'app-list-text',
    standalone: true,
    imports: [CommonModule, NgxPaginationModule, ReactiveFormsModule, FormsModule, SearchtextPipe, EditorialesppPipe, EstadoppPipe, AreasppPipe, TiposppPipe],
    templateUrl: './list-text.component.html',
    styleUrl: './list-text.component.css'
})
export class ListTextComponent {

    p: number = 1;
    showModal: boolean = false;
    isOpenModalEditar: boolean = false;
    isDigitalSelected: boolean = false;
    selectedFile: File | null = null;
    isParaEditar: number = 0;

    id_texto: number = 0;
    nombreTexto: string = '';
    searchValue: string = '';
    selectEstado: string = "2";
    selectedEditorial: string = '';
    urlSegura: SafeResourceUrl | undefined;
    selectedAuthorIds: number[] = []; // IDs de autores seleccionados

    textoSeleccionadoPorId: Texto | null = null;
    listTextos: Texto[] = [];
    editoriales: Editorial[] = [];
    autoresList: Autor[] = [];
    areas: Area[] = [];

    selectedArea: string = '';


    selectedTipo: string = '';
    tipos: Tipo[] = [];

    ejemplaresService = inject(GestEjemplaresService);


    ngOnInit(): void {
        // Obtenemos todos los textos
        this.getTextos();

        //obtenemos las areas
        this.ejemplaresService.getAutores().subscribe((data) => { this.autoresList = data })

        //obtenemos los editoriales:
        this.ejemplaresService.getEditorial().subscribe(
            (data) => {
                this.editoriales = data;
            }
        );

        //obtenemos las areas:
        this.ejemplaresService.getAreas().subscribe(
            (data) => {
                this.areas = data;
            }
        );

        //obtenemos las tipos:
        this.ejemplaresService.getTipos().subscribe(
            (data) => {
                this.tipos = data;
            }
        );
    }

    constructor(private sanitizer: DomSanitizer) {

    }

    getTextos(): void {
        this.ejemplaresService.getTextos().subscribe(
            (data) => {
                this.listTextos = data;
                console.log('lista de textos: ', this.listTextos)
            },
            (error) => {
                console.error('Error al obtener los textos:', error);
            }
        );
    }

    seleccionarTextoPorId(id: number): void {
        console.log(id)
        this.ejemplaresService.setIdParaListarEjemplar(id);
        this.ejemplaresService.openListEjemplares();
      }
}

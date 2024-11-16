import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date.component.html',
  styleUrl: './date.component.css'
})
export class DateComponent {

  currentDate: string;

  constructor() {
    // Inicializa la fecha y la hora actuales
    this.currentDate = new Date().toDateString();

  }

}

import { CommonModule } from '@angular/common';
import { Component, LOCALE_ID } from '@angular/core';

import localePy from '@angular/common/locales/es-PY';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePy, 'es')

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [CommonModule],
  providers: [{ provide: LOCALE_ID, useValue: 'es'}],
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

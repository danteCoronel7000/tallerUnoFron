import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccordionService {

  private accordionSideBarState: WritableSignal<boolean> = signal(false);

  constructor() { }


  toggleAccordionSideBar() {
    this.accordionSideBarState.update((state) => !state);
  }

  isAccordionSideBarOpen(): WritableSignal<boolean> {
    return this.accordionSideBarState;
  }
}

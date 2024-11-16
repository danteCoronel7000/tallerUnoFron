import { Component, computed, inject, Input, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuService } from '../../../business/users/services/menu.service';
import { CommonModule } from '@angular/common';
import { RolesService } from '../../../business/users/services/roles.service';
import { AccordionService } from '../../../business/users/services/accordion.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export default class SidebarComponent {

  private menuService = inject(MenuService);
  private rolesService = inject(RolesService);
  private accordionService = inject(AccordionService)

   accordionOpen!: WritableSignal<boolean>;

  // Signal que contiene los menús calculados
  menus: Signal<any[]> = computed(() => {
    const role = this.rolesService.selectedRole();
    return role ? this.menuService.getMenusByRole(role) : [];
  });

  constructor() {
    this.accordionOpen = this.accordionService.isAccordionSideBarOpen();
  }

  toggleAccordion() {
    this.accordionService.toggleAccordionSideBar();
  }
}


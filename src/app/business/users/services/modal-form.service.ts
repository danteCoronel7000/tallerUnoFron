import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalFormService {

  private isModalOpen = signal(false);
  private isModalOpenSelectFile = signal(false);
  private isModalOpenNewUsuario = signal(false);
  private isModalOpenEditUsuario = signal(false);

  constructor() { }

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  get modalState() {
    return this.isModalOpen;
  }

  openModalFile() {
    this.isModalOpenSelectFile.set(true);
  }

  closeModalFile() {
    this.isModalOpenSelectFile.set(false);
  }

  get modalStateFile() {
    return this.isModalOpenSelectFile;
  }
//nuevo personal
  openModalNewUser() {
    this.isModalOpenNewUsuario.set(true);
  }

  closeModalNewUser() {
    this.isModalOpenNewUsuario.set(false);
  }

  get modalStateNewUser() {
    return this.isModalOpenNewUsuario;
  }
//editar usuarios
  openModalEditUser() {
    this.isModalOpenEditUsuario.set(true);
  }

  closeModalEditUser() {
    this.isModalOpenEditUsuario.set(false);
  }

  get modalStateEditUser() {
    return this.isModalOpenEditUsuario;
  }

}

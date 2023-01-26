import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    public modalService: NgbModal
  ) { }

  /**
   * Metodo para generar un modal como alerta.
   *
   * @param   {string}    title           Titulo a mostrar
   * @param   {string}    description     Descripcion
   * @param   {string}    textButton      Texto del botón
   * @param   {Function}  functionButton  Metodo a ejecutarse en el evento clic del boton del modal antes de cerrarse
   *
   */
  openAlert = (title:string, description: string, textButton = 'OK', functionButton: Function = () => {}) => {
    const modalRef = this.modalService.open(AlertComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.description = description;
    modalRef.componentInstance.textButton = textButton;
    modalRef.componentInstance.functionButton = functionButton;
  }
}

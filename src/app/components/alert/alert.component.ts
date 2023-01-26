import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  constructor(private activeModal: NgbActiveModal) {}

  @Input() title:string = '';
  @Input() description: string = '';
  @Input() textButton: string = 'OK';
  @Input() functionButton: Function = () => {}

  /**
   * Metodo para cerrar el modal de alerta. Se ejecuta primero un metodo que recibe el componente y despues se cierra el modal.
   *
   */
  async closeModal() {
    await this.functionButton();
    this.activeModal.close('Modal Closed');
  }
}

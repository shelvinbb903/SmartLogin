import { Injectable } from '@angular/core';
import { FormGroupControls, AllValidationErrors } from './interfaces/AllValidationErrors';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor() { }

  /**
   * Metodo para obtener los errores del formulario generado de forma dinamica
   *
   * @param   {FormGroupControls[]}    controls  Campos del formulario
   *
   * @return  {AllValidationErrors[]}            Un array con los campos que generaron error
   */
  getFormValidationErrors(controls: FormGroupControls): AllValidationErrors[] {
    let errors: AllValidationErrors[] = [];
    Object.keys(controls).forEach(key => {
      const control = controls[ key ];
      if (control instanceof FormGroup) {
        errors = errors.concat(this.getFormValidationErrors(control.controls));
      }
      const controlErrors: any = controls[ key ].errors;
      if (controlErrors !== null) {
        Object.keys(controlErrors).forEach(keyError => {
          errors.push({
            control_name: key,
            error_name: keyError,
            error_value: controlErrors[ keyError ]
          });
        });
      }
    });
    return errors;
  }
}

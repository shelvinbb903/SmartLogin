import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormsService } from '../../services/forms.service';
import { ErrorsService } from '../../utils/errors.service';
import { AlertsService } from '../../utils/alerts.service';
import { AllValidationErrors } from '../../utils/interfaces/AllValidationErrors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data:any = {}   
  userForm:any = this.formBuilder.group({});
  

  constructor(
    private form: FormsService, 
    private formBuilder:FormBuilder, 
    private errorSer: ErrorsService,
    private alerts: AlertsService
    ) {}

  async ngOnInit() {
    await this.generateForm();    
  }

  /**
   * Metodo para consultar el formulario y generarlo en la vista
   *
   */
  generateForm = async () => { 
    const result:any = await this.form.getForm(`/form/1`);
    if(!result.error) {
      this.data = result.data
      this.generateValidations(result);      
    }
  }

  /**
   * Metodo para generar las validaciones de los campos que se generan en el servicio
   *
   * @param   {any}  obj  Objeto con los datos de retorno del servicio rest del backend
   *
   */
  generateValidations = async (obj:any) => {
    let validations:any = {}
    Object.keys(obj.data.properties).forEach((index) => {
      const objectInfo = obj.data.properties[index];
      
      const isRequired = obj.data.required.find((item:any) => item == index);
      objectInfo.required = isRequired ? true : false;
      if(isRequired) {
        validations[index] = [objectInfo.default, [Validators.required, Validators.pattern(objectInfo.pattern || '')]]
      } else {
        validations[index] = [objectInfo.default || '', [Validators.pattern(objectInfo.pattern || '')]]
      }
    })
    
    this.userForm = await this.formBuilder.group(validations);
  }

  /**
   * Metodo para enviar los datos al servicio rest que guarda los datos del formulario
   *
   */
  submitData = async () => {
    await this.clearErrors();
    const errors = this.errorSer.getFormValidationErrors(this.userForm.controls);

    if(errors.length > 0) {
      
      errors.forEach((item:AllValidationErrors) => {
        this.data.properties[item.control_name].error = item.error_name == 'required' ? `Deber ingresar ${this.data.properties[item.control_name].title}` : 'Los datos ingresados en el campo son incorrectos';
      })
      this.alerts.openAlert("Error", "Los datos ingresados son incorrectos", 'Aceptar')
      return;
    }
    
    delete this.data['id'];

    Object.keys(this.data.properties).forEach((index) => {
      delete this.data.properties[index]['required'];
    });
    await this.clearErrors();

    Object.keys(this.userForm.controls).forEach(key => {
      this.data.properties[key].value = this.userForm.get(key).value;    
    });

    const result:any = await this.form.registerData(`/form`, this.data);
    if(result.error) {
      return;
    }

    this.alerts.openAlert("Alert", "Información registrada correctamente", 'Aceptar', () => {
      
      this.generateForm(); 
    })
    
  }

  /**
   * Borrar todos los mensajes de error
   *
   */
  clearErrors = () => {
    Object.keys(this.data.properties).forEach((index) => {
      this.data.properties[index].error = null;
    })
  }
}

import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private rest: RestService) { }

  /**
   * Metodo para consumir el servicio de obtener un formulario
   *
   * @param   {string}  url   URL del servicio
   * @param   {any}     data  Datos que se pasan como parametro. Si no hay se envio un objeto vacio
   *
   * @return  {Promise<Object>}        Retorna una promesa con un objeto, el cual contiene la respuesta del servicio y un atributo para indicar si se genero error
   */
  getForm = (url:string, data: any = {}) => {
    return this.rest.connectionGET(url, data);
  }

  /**
   * Metodo para consumir el servicio de registrar un formulario
   *
   * @param   {string}  url   URL del servicio
   * @param   {any}     data  Datos que se pasan como parametro. Si no hay se envio un objeto vacio
   *
   * @return  {Promise<Object>}        Retorna una promesa con un objeto, el cual contiene la respuesta del servicio y un atributo para indicar si se genero error
   */
  registerData = (url:string, data: any = {}) => {
    return this.rest.connectionPOST(url, data);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  /**
   * Generar una conexion a un servicio rest de tipo post
   *
   * @param   {string}  url   URL del servicio rest a ejecutar
   * @param   {any}     data  Parametros a enviar en el servicio rest
   *
   * @return  {Promise<object>}   Se genera una promesa con el resultado del servicio rest, ya sea correcto o con error
   */
  connectionPOST = (url: string, data: any) => {
    return new Promise(resolve => {            
      this.http.post(`${environment.URL_REST}${url}`, data).subscribe({
        next: response => {
          resolve({
            error: false,
            data: response
          })
        },
        error: dataError => {
          console.log(dataError)
          resolve({
            error: true,
            data: dataError.error.error || dataError.error.Message
          })
        }
      })
    })
  }

  /**
   * Generar una conexion a un servicio rest de tipo get
   *
   * @param   {string}  url   URL del servicio rest a ejecutar
   * @param   {any}     data  Parametros a enviar en el servicio rest
   *
   * @return  {Promise<object>}        Se genera una promesa con el resultado del servicio rest, ya sea correcto o con error
   */
  connectionGET = (url: string, data: any) => {
    return new Promise(resolve => {

      this.http.get(`${environment.URL_REST}${url}`, {params: data}).subscribe({
        next: response => {
          resolve({
            error: false,
            data: response
          })
        },
        error: dataError => {
          resolve({
            error: true,
            data: dataError.error.error || dataError.error.Message
          })
        }
      })
    })
  }
}

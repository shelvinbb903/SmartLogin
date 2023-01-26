# Proyecto

## Datos
Este proyecto fue generado con las siguientes caracteristicas:

- Angular CLI versión 15.1.2.
- NPM versión 8.11.0
- Node.js versión 16.15.1
- Bootstrap

## Instrucciones

- Descargar e instalar node.js para ejecutar comandos npm
- Instalar Angular CLI con el siguiente comando `npm install -g @angular/cli`
- Clonar proyecto desde el repositorio en GitHub con el comando `git clone https://github.com/shelvinbb903/SmartLogin.git` o bien puede usar la herramiento visual de GitHub que le permita clonar el proyecto en su equipo.
- Despues de clonar el proyecto acceder a la carpeta con el comando `cd` desde una terminal de comandos.
- Instalar las dependencias de node usa el comando `npm install`. Si ocurre un error agregar la opcion --force
- Ejecutar comando `ng serve` para comenzar a realizar pruebas. Por defecto se usa la url `http://localhost:4200/`.
- Se debe ejecutar el comando `npm run server` para tener activado un servidor local y asi generar un backend local con json server. Los datos de los servicios estan dentro del archivo db.json en la carpeta principal del proyecto.

## Dato Adicional

- Los campos del formulario generado de manera dinamica, validan cuales campos son requeridos y cuales no, de acuerdo a los datos generados en el servicio rest local. Cada campo tiene a su izquierda un icono: si el icono tiene una estrella dentro, significa que es obligatorio. Si no tiene la estrella es opcional.
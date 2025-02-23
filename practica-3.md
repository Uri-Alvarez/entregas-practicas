# El patrón modelo-vista-controlador

El patrón de arquitectura MVC convierte el desarrollo de aplicaciones complejas en un proceso mucho más manejable. Permite a varios desarrolladores trabajar simultáneamente en la aplicación.

![Patrones Arquitectura MVC](/Imagenes/Patrones_Arquitectura_MVC.png)

## ¿Qué es MVC?

MVC significa modelo (Model), vista (View) y controlador (Controller). Esto es lo que significan cada uno de esos componentes:

- **Modelo**: El backend que contiene toda la lógica de datos.
- **Vista**: El frontend o interfaz gráfica de usuario (GUI).
- **Controlador**: El cerebro de la aplicación que controla cómo se muestran los datos.

El concepto de MVC fue introducido por primera vez por Trygve Reenskaug, quien lo propuso como una forma de desarrollar el GUI de aplicaciones de escritorio.

Hoy en día, el patrón MVC se utiliza para aplicaciones web modernas porque permite que la aplicación sea escalable, mantenible y fácil de expandir.

El patrón MVC te ayuda a dividir el código frontend y backend en componentes separados. De esta manera, es mucho más fácil administrar y hacer cambios a cualquiera de los lados sin que interfieran entre sí.

Pero esto es más fácil decirlo que hacerlo, especialmente cuando varios desarrolladores necesitan actualizar, modificar o depurar una aplicación completada simultáneamente.

## Componentes

Los tres componentes que componen el patrón de arquitectura MVC son:

### Modelo (Datos)

El trabajo del modelo es simplemente administrar los datos. Ya sea que los datos provengan de una base de datos, una API o un objeto JSON, el modelo es responsable de administrarlos.

### Vistas (UI)

El trabajo de la vista es decidir qué verá el usuario en su pantalla y cómo.

### Controlador (Cerebro)

La responsabilidad del controlador es extraer, modificar y proporcionar datos al usuario. Esencialmente, el controlador es el enlace entre la vista y el modelo.

## MVC Frameworks

JavaScript ha crecido en popularidad y se ha apoderado del backend en los últimos años. Cada vez más aplicaciones JavaScript han optado por el patrón de arquitectura MVC de una manera u otra.

Los frameworks van y vienen, pero lo que ha sido constante son los conceptos tomados del patrón de arquitectura MVC.

Algunos de los primeros frameworks que aplicaron estos conceptos fueron **KnockoutJS**, **Django** y **Ruby on Rails**.

Fuentes:
Hernandez, R. D. (2021, 28 junio). El patrón modelo-vista-controlador:  Arquitectura y frameworks explicados. freeCodeCamp.org. https://www.freecodecamp.org/espanol/news/el-modelo-de-arquitectura-view-controller-pattern/
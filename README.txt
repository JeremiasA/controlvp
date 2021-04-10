<--! Control de ventas y pedidos -->

Compuesto por dos páginas(ventas y pedidos) lleva un registro que permite filtrar por mes y año
a través de dos <select>.
En la sección 'pedidos', al marcar un elemento como 'entregado'(icono $) el mismo pasará a agregarse 
al listado de ventas.
Se utiliza una base de datos MongoDB con dos collections (ventas y pedidos) 

*** TECNOLOGIAS Y METODOLOGÍAS UTILIZADAS***

- NodeJs
    dependencies:
    	- express
    	- mongoose
	- ejs (view engine)
	- moment

    devDependencies:
    	- morgan
    	- nodemon

- MongoDB

- HTML5, CSS3, Javascript(ES6)

- MVC(Model View Controller)

- Programación funcional


*** SOBRE EL PROYECTO *** 

Este pequeño proyecto fué parte de mi primer experiencia práctica en el manejo de bases de datos MongoDB.

En principio fué desarrollado con callbacks y promises para luego ser reemplazado por la herramienta mas moderna (async-await)

Actualmente mediante NodeJs y un motor de plantillas (EJS) se responde a cada petición del cliente enviando una archivo formateado
con los datos incrustados. Una futura versión utilizará Ajax en el lado del cliente para evitar recargar la página, obteniendo y
mostrando los datos desde el cliente.

HEROKU: https://controlventaspedidos.herokuapp.com/

<footer> @Desarrollado por Jeremias Amestoy para GamesFriends. </footer> 
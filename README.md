# Marvel Challenge

La APP SPA la desarrolle con Angular en su última versión (4), para correr la app desde su máquina debe tener instalado NodeJs en su ultima versión, luego hacer lo siguiente:
	
## Usando Angular CLI

1. Clonar o descargar el repositorio de github https://github.com/jcastro540/marvelSPA
2. Si deseas correr la app con con angular cli debe instalarlo, acá el url https://cli.angular.io/
3. Una vez instalado en cli, estando en la carpeta de clonada ejecutar el comando:  npm install
4. Luego ejecutar el comando ng serve

## Usando un servidor local

1. Clonar o descargar el repositorio de github https://github.com/jcastro540/marvelSPA
2. De la carpeta clocada o descargada copia la carpeta dist y moverla a la carpeta publica del server .
3. Luego ir a http://localhost/nombredelacarpeta

## En la web
La app se encuentra en producción corriendo en [http://marvel.josecastro.com.ve/home](http://marvel.josecastro.com.ve/home)

## Test
Para correr los tests ejecutar los comandos ng test (Test unitarios) y ng e2e (Test de integración)


### Las capas de la aplicación

La app se encuentra diseñada utilizando el modelo de web components con el que trabaja angular 4, a continuación describiré el detalle de cada uno de los componentes, y servicios creados.

## Components
1. app-component: Es el componente principal donde se renderiza la aplicación
2. home-component: Es el componente del /home, encargado de mostrar los resultados realizados en el buscador, su clase es HomeComponent, y contiene tres metodos, de los cuales los mas importantes son el setPage, que se encarga de llamar al PagerService(Servicio crea el paginador), y el getHeroesPaginados que se encarga de ejecutar el servicio MarvelService(Servicio que se encarga de hacer las peticiones http al api).
3. detail.component:  Es el componente del /hero-detail/:id, encargado de mostrar el detalle de un personaje seleccionado. Su clase es DetailComponent la cual posee 6 métodos, encargados básicamente de la carga del personaje, de la busqueda de los comics relacionados al personaje y de la acción de agregar a favorito un comic seleccionado, esto ultimo a través del servicio FavouriteService,que se encarga de manejar todo lo relacionado con la persistencia en local storage.
4. favourite.component: Es el componente encado del bloque de favoritos, su clase es FavouriteComponent, posee 2 métodos, que se encargan de cargar los favoritos y de borrar un favorito
5. footer.component: Este componente básicamente se encarga de renderizar el footer, no posee otra tarea, su clase es FooterComponent y no posee metodos ni propiedades
6. navbar.component: Este componente es el encargado de renderizar la barra superior, el posee una clase NavbarComponent, que se encargar de realizar las busquedas, a través del servicio MarvelService, y de añadir tres cómics al azar al listado de favoritos. Posee seis metodos.

## Servicios
1. favourite.service: Servicio encargado de salvar y obtener los favoritos del local storage, posee una clase FavouriteService, quecuenta con dos metodos, getFavourite y deleteFavourite.
2. marvel.service: Servicio encargado de hacer las peticiones http al api de marvel, su clase es MarvelService, posee cuatro metodos, findCharacter, getHero y getComic
3. pager.service: Servicio que se encarga de generar la paginación, su clase es PagerService, tiene un sólo metodo , getPager encargado de generar la paginación.	
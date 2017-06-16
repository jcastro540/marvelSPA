import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../../services/marvel.service';
import { PagerService } from '../../services/pager.service';
import { FavouriteService } from '../../services/favourite.service';
import { Router } from '@angular/router';

declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  

  
  idComicsArray:number[] = [];
  comicItem:any[]= [];
  comicsData:any[]=[];
  valueAle:any[] = [];
  idAleFavo:any=[];
  aleatorioFavourites:any[]=[];
  constructor(public _marvelService:MarvelService,
              public _pagerService:PagerService, 
              public _favouriteService:FavouriteService,
              private router:Router,
              ) { 
       
 }

  ngOnInit() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }

  buscarHeroe(){
    this._marvelService.loader = true;
    this._marvelService.heroes = [];
  	this._marvelService.findCharacter(this._marvelService.heroe)
  		.subscribe(heroes=>{
  			this._marvelService.heroes = heroes.data.results;
  			if(heroes.data.total == null || heroes.data.total == 0){
  				this._marvelService.itemsPaginated = 1;
  			}else{
  				this._marvelService.itemsPaginated = heroes.data.total;	
  			}
  			   
  			this.setPage(1);
        // if(this._marvelService.heroes.length > 0){
        this.idAleFavo = []
        this.getIdsComics(this._marvelService.heroes);
        this._marvelService.loader = false;
        // }else{
        //   this.idComicsArray = [];
        //   // console.log('Vacio');
        // }
        return this.router.navigate(['/home']);

      });


  }

    //Paginador

  setPage(page: number) {
        if (page < 1 || page > this._marvelService.pager.totalPages) {
            return;
        }
         
        // Obtener el objeto de paginación de servicio
        this._marvelService.pager = this._pagerService.getPager(this._marvelService.itemsPaginated, page);
        // console.log(this._marvelService.pager);
        // console.log(this.pager);
 	
        // Obtener la página actual de los elementos
        this._marvelService.pagedItems = this._marvelService.heroes.slice(this._marvelService.pager.startIndex, this._marvelService.pager.endIndex + 1);

        // console.log('limite ', this._marvelService.pager.limit)
        // console.log('offset ',this._marvelService.pager.offset)
        this._marvelService.offset = this._marvelService.pager.offset;
        // console.log('paginador', this._marvelService.pager.pages);

    }

    getIdsComics(array){
      // obtengo el array para extraer los datos
      this.comicsData = array;
      // let comicItem:any[]= [];
      let allComics:any[]= [];
      
      // console.log(comics);
      // Recorro el array princiapal para sacar el arreglo de items
      for(let comic of this.comicsData){
        // console.log(comic.comics.items);
        if(this.comicsData.length > 0){
          this.comicItem.push(comic.comics.items);
          // console.log(comic.comics.items);
        } else if(this.comicsData.length == 0){
          this.comicItem = [];
        }
        else{
          this.comicItem = [];
        }
      }
      // console.log('items',this.comicItem);
      // Recorro el arreglo de items para sacar las url
       for(let i = 0; i < this.comicItem.length; i++){
         // console.log(comicItem[i])
         for(let c of this.comicItem[i]){
           // console.log(c.resourceURI);
           if (c.resourceURI){
             allComics.push(c.resourceURI)
           }
         }
       }
       // console.log(allComics)

       //Extraer los ids de los comics
       for(let url of allComics){
         let arr = url.split('/');
         let last = arr.pop();
         let idComicsNumber = parseInt(last);
         this.idComicsArray.push(idComicsNumber);
       }
       // console.log(this.idComicsArray);
       // this.comicsValoresAleatorios(this.idComicsArray)

    }


  comicsValoresAleatorios(comics:number[]){
    let fin = comics.length -1;
    let ale:number[] = [];
    this.idAleFavo = [];
    // console.log(fin);
    // obtengo numero aleatorio de la posicion del array
    for(let i = 1; i <= 3; i++){
       // console.log(Math.floor((Math.random() * fin)));
       ale.push(Math.floor((Math.random() * fin)))
    }
    this.valueAle = ale;
    // console.log('ale: ',this.valueAle);
    // Comparo ambos arreglos por posicion y obtengo el id de las pocisiones que hagan match
    for(let i of this.valueAle){
      // console.log(i);
      for(let c in this.idComicsArray){
        if(i == c){
          // console.log('iguales')
          // console.log(this.idComicsArray[c]);
          
          this.idAleFavo.push(this.idComicsArray[c])   
          // console.log(this.idAleFavo)   
        }
      }
    }
    // console.log('idalefavo', this.idAleFavo);
  }


  agregarFavoritoAleatorio(){
    this.comicsValoresAleatorios(this.idComicsArray)
    // console.log(this.idAleFavo)
    // this.idAleFavo = [];
    // this.getIdsComics(this._marvelService.heroes);
    let nuevoFavorite:any=[];
    // console.log(this.idAleFavo)
    // console.log(this._favouriteService.favourites)

    // Comparo los dos arreglos y verifico si hay match
    for(let f of this._favouriteService.favourites){   
      
       // console.log('fav',f.id)

       for (let x of this.idAleFavo) {
         // console.log('ale',x);

         if(f.id === x){
           // console.log('equal', f.id, x)
         }else{
           // console.log('not-equal', f.id, x)
           nuevoFavorite.push(x)
         }

       }
      
    }
     // console.log(nuevoFavorite);
       //Elimino los repetidos del array
      nuevoFavorite = this.eliminarDuplicados(nuevoFavorite)
      // console.log(nuevoFavorite);

     // Finalment los guardo en localStorage
      
      if(this._favouriteService.favourites.length == 0){
          for(let favo of this.idAleFavo){
          // hago la petición para obtener esos comics
          this._marvelService.getComic(favo)
                .subscribe(data=>{
                  this._favouriteService.saveFavourite(data.data.results[0]);
          });
        }
      }else{
        for(let favo of nuevoFavorite){
        // hago la petición para obtener esos comics
        this._marvelService.getComic(favo)
              .subscribe(data=>{
                this._favouriteService.saveFavourite(data.data.results[0]);
        });
      }
    }
   
  }

eliminarDuplicados(arr) {
   let i, len=arr.length, out=[], obj={};

   for (i=0;i<len;i++) {
      obj[arr[i]]=0;
   }

   for (i in obj) {
      out.push(i);
   }

   return out;
 }


}

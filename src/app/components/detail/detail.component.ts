import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../../services/marvel.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FavouriteService } from '../../services/favourite.service';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class DetailComponent implements OnInit {
  
  id:number;
  hero:any[];
  hashImg:string ="/standard_fantastic";
  hashImgComic:string ="/portrait_uncanny"
  idComics = [];
  comics:any[]=[];
  favo:any;

  constructor( public _marvelService:MarvelService,
  			   public _activatedRoute:ActivatedRoute,
  			   public _favouriteService:FavouriteService,
           public location: Location  ) {
              this._marvelService.location = location;
              // console.log(this._marvelService.location.path());
            }

  ngOnInit() {
    this._marvelService.loader = true;
  	this._activatedRoute.params.forEach((params:Params)=>{
  		this.id = params['id'];
  		this._marvelService.getHero(this.id)
  			.subscribe(hero=>{
  				this.hero = hero.data.results;
  				// console.log(this.hero)
  				this.getIdComic(this.hero);
  				this.getComics();
  				this._favouriteService.getFavourite();
          this._marvelService.loader = false;
  			})
  	});
  }

  getIdComic(heroes:any[]){
 	let urls=[];

  	for(let heroe of heroes){
  		// console.log(heroe.comics.items);
  		for(let uri of heroe.comics.items){
  			//convierto a array
  			let arr = uri.resourceURI.split('/');
  			// saco el idComics del Array
  			let last = arr.pop();
  			//Parseo los idComics a numeros
  			let idComicsNumber = parseInt(last);
  			//Paso los idComics al arreglo
  			this.idComics.push(idComicsNumber);
  		}
  		// console.log('idComics', this.idComics);
  	}
  }

  getComics(){
  	for(let id of this.idComics){
  		this._marvelService.getComic(id)
  			.subscribe( comic => {
  				// console.log(comic.data.results);
  				this.comics.push(comic.data.results);
  			})
  	}
  	// console.log(this.comics);
  }

  addFavorite(comic:any){
  	// console.log(comic);
    // this.isFavorite(this._favouriteService.favourites, comic.id);
  	this._favouriteService.saveFavourite(comic);
  	// console.log(this._favouriteService.favourites);
  	this._favouriteService.getFavourite();
  }

  isFavourite(arreglo, id){
    // console.log(arreglo);
    // console.log(id);
    for(let val of arreglo){
      if( val.id == id){
        // console.log( 'val: ' + val.id , 'id: ' + id );
        // console.log('Es favorito')
        return true;
      }
       else{
        // console.log( 'val: ' + val.id , 'id: ' + id );
        // console.log('no favorito');
        // return false;
      }

    }
  }

  existeComic(id){
    this.favo = this.isFavourite(this._favouriteService.favourites, id);
    // console.log(this.favo);
  }

}

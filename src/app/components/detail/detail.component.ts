import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../../services/marvel.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  
  id:number;
  hero:any[];
  hashImg:string ="/standard_fantastic";
  hashImgComic:string ="/portrait_uncanny"
  idComics = [];
  comics:any[]=[];

  constructor( public _marvelService:MarvelService,
  			   public _activatedRoute:ActivatedRoute ) { }

  ngOnInit() {
  	this._activatedRoute.params.forEach((params:Params)=>{
  		this.id = params['id'];
  		this._marvelService.getHero(this.id)
  			.subscribe(hero=>{
  				this.hero = hero.data.results;
  				// console.log(this.hero)
  				this.getIdComic(this.hero);
  				this.getComics();
  			})
  	})
  }

  getIdComic(heroes:any[]){
 	let urls=[];

  	for(let heroe of heroes){
  		console.log(heroe.comics.items);
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
  		console.log('idComics', this.idComics);
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
  	console.log(this.comics);
  }

}
import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../../services/marvel.service';
import { PagerService } from '../../services/pager.service';


import * as _ from 'underscore';
 



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  heroes:any;
  hashImg:string ="/standard_fantastic";
  order:any[] = [
  	{
  		name: 'name',
  		view: 'Name Asc'
  	},
  	{
  		name: 'modified',
  		view: 'Modified Asc'
  	},
  	{
  		name: '-name',
  		view: 'Name Desc'
  	},
  	{
  		name: '-modified',
  		view: 'Modified Desc'
  	}];



  constructor( public _marvelService:MarvelService,
  			   private _pagerService: PagerService ) { }

  ngOnInit() {
  	// this.getHeroes(); 		
  }

  // getHeroes(){
  // 	this._marvelService.getCharacter()
  // 		.subscribe(heroes=>{
  // 			// console.log(heroes.data.results);
  // 			this._marvelService.heroes = heroes.data.results;
  // 			this._marvelService.itemsPaginated = heroes.data.total;
  // 			// console.log(this.heroes);
  // 			// console.log(this._marvelService.itemsPaginated);

  // 			this.setPage(1);
  // 		});
  // }

  //Paginador

  setPage(page: number) {
        if (page < 1 || page > this._marvelService.pager.totalPages) {
            return;
        }
 
        // Obtener el objeto de paginación de servicio
        this._marvelService.pager = this._pagerService.getPager(this._marvelService.itemsPaginated, page);
        // console.log(this._marvelService.pager);
        // Obtener la página actual de los elementos
        this._marvelService.pagedItems = this._marvelService.heroes.slice(this._marvelService.pager.startIndex, this._marvelService.pager.endIndex + 1);

        console.log('limite ', this._marvelService.pager.limit)
        console.log('offset ',this._marvelService.pager.offset)
        // this.getHeroes();
        this._marvelService.offset = this._marvelService.pager.offset;
        this.getHeroesPaginados();

    }

    getHeroesPaginados(){

  		this._marvelService.findCharacter(this._marvelService.heroe)
  		.subscribe(heroes=>{
  			this._marvelService.heroes = heroes.data.results;
  			this._marvelService.itemsPaginated = heroes.data.total;
  			// console.log(this._marvelService.itemsPaginated);
  			// console.log('Buscar', this._marvelService.heroes);
  			// this.setPage(1);
  		})
    }





}

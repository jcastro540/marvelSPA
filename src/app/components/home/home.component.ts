import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../../services/marvel.service';
import { PagerService } from '../../services/pager.service';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class HomeComponent implements OnInit {
  
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
      			   private _pagerService: PagerService,
               public location: Location ) { 
     // this.location = location;
     this._marvelService.location = location;
     // console.log(this._marvelService.location.path());
  }

  ngOnInit() {
	  
  }


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

        // console.log('limite ', this._marvelService.pager.limit)
        // console.log('offset ',this._marvelService.pager.offset)
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

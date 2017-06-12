import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../../services/marvel.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  heroes:any;
  hashImg:string ="/standard_fantastic"

  constructor( public _marvelService:MarvelService ) { }

  ngOnInit() {

  	  	this._marvelService.getComics()
  		.subscribe(heroes=>{
  			console.log(heroes.data.results);
  			this.heroes = heroes.data.results;

  		});

  }

}

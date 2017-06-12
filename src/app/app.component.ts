import { Component } from '@angular/core';
import { MarvelService } from './services/marvel.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  heroe:any;

  constructor( public _marvelService:MarvelService){
  	this._marvelService.getComics()
  		.subscribe(heroes=>{
  			console.log(heroes.data.results);
  			this.heroe = heroes.results;
  		})
  }
}


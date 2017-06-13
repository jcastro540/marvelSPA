import { Component, OnInit } from '@angular/core';
import { FavouriteService } from '../../services/favourite.service';


@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  hashImgComic:string ="/portrait_uncanny";

  constructor( public _favouriteService:FavouriteService) { }

  ngOnInit() {
  	this._favouriteService.getFavourite();
  }

  borrarFavorito(favourite:any){
  	// console.log(favourite);
  	this._favouriteService.deleteFavourite(this._favouriteService.favourites,'id', favourite);
  	// this._favouriteService.getFavourite();
  }
  

}

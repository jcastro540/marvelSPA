import { Injectable } from '@angular/core';

@Injectable()
export class FavouriteService {
 
  favourites:any[]=[];

  constructor() { }

  saveFavourite(favourite:any){
  	this.favourites.push(favourite)
  	localStorage.setItem('favourite', JSON.stringify(this.favourites));
  	console.log(this.favourites);
  }

  getFavourite(){
  	if(JSON.parse(localStorage.getItem('favourite')) != null){
  		this.favourites = JSON.parse(localStorage.getItem('favourite'));
  		console.log(this.favourites);
  	}else{
  		this.favourites=[];
  		console.log(this.favourites);
  	}
  	
  }


	deleteFavourite(array, idlocal, idBorrar){
		array.forEach(function(result, index){
			if(result[idlocal] === idBorrar){
				// Elimina el array
				array.splice(index,1);
			}	
		});
		this.favourites = array;
		// console.log(this.favourites)
		localStorage.setItem('favourite', JSON.stringify(this.favourites));
	}


}

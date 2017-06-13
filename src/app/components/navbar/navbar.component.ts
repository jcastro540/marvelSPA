import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../../services/marvel.service';
import { PagerService } from '../../services/pager.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public _marvelService:MarvelService, public _pagerService:PagerService, private router:Router) { }

  ngOnInit() {
  }

  buscarHeroe(){
  	this._marvelService.findCharacter(this._marvelService.heroe)
  		.subscribe(heroes=>{
  			this._marvelService.heroes = heroes.data.results;
  			if(heroes.data.total == null || heroes.data.total == 0){
  				this._marvelService.itemsPaginated = 1;
  			}else{
  				this._marvelService.itemsPaginated = heroes.data.total;	
  			}
  			
  			// console.log(this._marvelService.itemsPaginated)
  			// console.log(this._marvelService.itemsPaginated);
  			// console.log('Buscar', this._marvelService.heroes);
  			this.setPage(1);
        return this.router.navigate(['/home']);

  		})
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


}

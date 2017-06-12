import { Injectable } from '@angular/core';
import * as _ from 'underscore';

@Injectable()
export class PagerService {

  constructor() { }


  	getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
        // Calcular el total de páginas
        let totalPages = Math.ceil(totalItems / pageSize);
 
        let startPage: number, endPage: number, limit:number = 10, offset:number = 0;
        if (totalPages <= 10) {
            // Menos de 10 páginas totales se muestran todas
            startPage = 1;
            endPage = totalPages;
            limit = currentPage * 10;
            offset = currentPage *10 - 10;


        } else {
            //  más de 10 páginas totales calculamos las páginas inicial y final y agregas el offset y el start
            if (currentPage <= 1) {
                startPage = 1;
                endPage = 10;

            } 

            	else if (currentPage + 9 >= totalPages) {
                    startPage = totalPages - 9;
                    endPage = totalPages;
                    limit = currentPage * 10;
                    offset = currentPage *10 - 10;
              
            } 
            	else {
                    startPage =  currentPage ;
                    endPage = currentPage + 9;
                    limit = currentPage * 10;
                    offset = currentPage *10 - 10;


            }
        }



 
        // Calcular los índices de elementos iniciales y finales
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
 
        // Crear una array de páginas para ng-repeat
        let pages = _.range(startPage, endPage + 1);
 
        // returna todos los objetos requeridos para la vista
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages,
            limit: limit, 
            offset: offset
        };
    }

}

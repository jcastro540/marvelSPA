import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { Config } from '../config/config';
import { Http } from '@angular/http';
import  'rxjs/Rx';



@Injectable()
export class MarvelService {
  
  location:any;

  loader:boolean;

  ts:number = new Date().getTime();
  hash:any;
  limit:number = 10;
  offset:number= 0;
  orderBy:string = "";
  config:Config = new Config();
  marvelUrlCharacter:string = 'https://gateway.marvel.com:443/v1/public/characters';
  marvelUrlComic:string = 'https://gateway.marvel.com/v1/public/comics';
  itemsPaginated:number;

  heroes:any[]= [];
  heroe:string ="";
  pager: any = {};
  pagedItems: any[];


  constructor( private http:Http ) {
  	this.hash = Md5.hashStr(this.ts + this.config.privKey + this.config.publicKey);
  	// console.log(this.hash);
  }

  findCharacter(name:string){
     let url:string;
    if(this.heroe){
      url = `${this.marvelUrlCharacter}?nameStartsWith=${this.heroe}&orderBy=${this.orderBy}&ts=${this.ts}&offset=${this.offset}&limit=${this.limit}&apikey=${this.config.publicKey}&hash=${this.hash}`;
    }else{
      url = `${this.marvelUrlCharacter}?nameStartsWith=.&orderBy=${this.orderBy}&ts=${this.ts}&offset=${this.offset}&limit=${this.limit}&apikey=${this.config.publicKey}&hash=${this.hash}`;
    }   
    
    // console.log(url);
    return this.http.get(url)
                .map(res=>{
                  // console.log(res.json())
                  return res.json();
                }, err=>{console.log(err)});
  }

  getHero(id:number){
    let url = `${this.marvelUrlCharacter}/${id}?ts=${this.ts}&apikey=${this.config.publicKey}&hash=${this.hash}`;
    return this.http.get(url)
                .map(res=>{
                  // console.log(res.json());
                  return res.json();
                }, err=>{console.log(err)});
  }

 
  getComic(id:number){
    let url = `${this.marvelUrlComic}/${id}?ts=${this.ts}&apikey=${this.config.publicKey}&hash=${this.hash}`
    // console.log(url);
    return this.http.get(url)
                .map(res=>{
                  return res.json();
                },err=>{console.log(err)});
  }



}

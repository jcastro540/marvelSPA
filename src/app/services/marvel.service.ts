import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { Config } from '../config/config';
import { Http } from '@angular/http';
import  'rxjs/Rx';



@Injectable()
export class MarvelService {
 
  ts:number = new Date().getTime();
  hash:any;
  limit:number = 100;
  offset:number= 0;
  config:Config = new Config();
  marvelUrl:string = 'https://gateway.marvel.com:443/v1/public/characters';
  heroe:string = "wolverine";


  constructor( private http:Http ) {
  	this.hash = Md5.hashStr(this.ts + this.config.privKey + this.config.publicKey);
  	console.log(this.hash);
  }
//https://gateway.marvel.com:443/v1/public/characters?name=hulk&apikey=ef9e47c52f977f780ed44602326c48ff
//https://gateway.marvel.com/v1/public/comics?ts=1497045126813&apikey=ef9e47c52f977f780ed44602326c48ff&hash=88034b419df32695820cda3756c9c0be
// let url = `${this.marvelUrl}?ts=${this.ts}&limit=${this.limit}&name={hulk}&apikey=${this.config.publicKey}&hash=${this.hash}`;

//url unico de comic id
//http://gateway.marvel.com/v1/public/comics/31366?ts=1497047459807&apikey=ef9e47c52f977f780ed44602326c48ff&hash=dc7212d2ea0559cde83c3bfc2e331512

  getComics(){
  	let url = `${this.marvelUrl}?ts=${this.ts}&offset=${this.offset}&limit=${this.limit}&apikey=${this.config.publicKey}&hash=${this.hash}`;
  	return this.http.get(url)
  		.map(res=> {
  			return res.json()
  		});
  }

}

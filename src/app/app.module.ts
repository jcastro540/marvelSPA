import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';// Rutas
import { APP_ROUTING } from './app.routes'

//Servicios
import { MarvelService } from './services/marvel.service';
import { PagerService } from './services/pager.service';
import { FavouriteService } from './services/favourite.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DetailComponent } from './components/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTING
  ],
  providers: [MarvelService, PagerService, FavouriteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
PagerService
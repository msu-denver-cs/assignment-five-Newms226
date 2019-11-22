import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StatusComponent } from './status/status.component';
import { CarListComponent } from './cars/car-list/car-list.component';
import { CarDisplayComponent } from './cars/car-display/car-display.component';

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    CarListComponent,
    CarDisplayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

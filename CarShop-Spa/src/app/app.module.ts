import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StatusComponent } from './status/status.component';
import { CarListComponent } from './cars/car-list/car-list.component';
import { CarDisplayComponent } from './cars/car-display/car-display.component';
import { MakeListComponent } from './makes/make-list/make-list.component';
import { MakeDisplayComponent } from './makes/make-display/make-display.component';
import { PartListComponent } from './parts/part-list/part-list.component';
import { PartDisplayComponent } from './parts/part-display/part-display.component';

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    CarListComponent,
    CarDisplayComponent,
    MakeListComponent,
    MakeDisplayComponent,
    PartListComponent,
    PartDisplayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

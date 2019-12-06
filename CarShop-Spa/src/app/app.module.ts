import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxMasonryModule } from 'ngx-masonry';
import { AngularTokenModule } from 'angular-token';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StatusComponent } from './status/status.component';
import { CarListComponent } from './cars/car-list/car-list.component';
import { CarDisplayComponent } from './cars/car-display/car-display.component';
import { MakeListComponent } from './makes/make-list/make-list.component';
import { MakeDisplayComponent } from './makes/make-display/make-display.component';
import { PartListComponent } from './parts/part-list/part-list.component';
import { PartDisplayComponent } from './parts/part-display/part-display.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { AbstractListComponent } from './api/list/list.component';
import { RegisterComponent } from './authn/register/register.component';
import { LoginComponent } from './authn/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    CarListComponent,
    CarDisplayComponent,
    MakeListComponent,
    MakeDisplayComponent,
    PartListComponent,
    PartDisplayComponent,
    NavbarComponent,
    AbstractListComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    // MDBBootstrapModule.forRoot(),
    NgbModule,
    NgxMasonryModule,
    AngularTokenModule.forRoot({
      apiBase: 'http://localhost:3000/api'
    }),
    ReactiveFormsModule
  ],
  providers: [ AngularTokenModule ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AppModule { }

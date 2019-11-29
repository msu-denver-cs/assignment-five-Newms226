import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

export interface CarTypeaheadConf {
  parts: string[];
  makes: string[];
  models: string[];
  vins: string[];
}

@Injectable({
  providedIn: 'root'
})
export class TypeaheadService {
  config: CarTypeaheadConf;

  constructor(private http: HttpClient) { 
    this.getConfig()
  }

  makes = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(upTerm => {
        if (upTerm.length >= 2) {
          let term = upTerm.toLowerCase();
          return this.config.makes.filter(
            v => v.toLowerCase().indexOf(term) > -1
          ).slice(0, 10)
        }
      })
    )
  
  models = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(upTerm => {
        if (upTerm.length >= 2) {
          let term = upTerm.toLowerCase();
          return this.config.models.filter(
            v => v.toLowerCase().indexOf(term) > -1
          ).slice(0, 10)
        }
      })
    )

  vins = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(upTerm => {
        if (upTerm.length >= 2) {
          let term = upTerm.toLowerCase();
          return this.config.vins.filter(
            v => v.toLowerCase().indexOf(term) > -1
          ).slice(0, 10)
        }
      })
    )

  parts = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(upTerm => {
        if (upTerm.length >= 2) {
          let term = upTerm.toLowerCase();
          return this.config.parts.filter(
            v => v.toLowerCase().indexOf(term) > -1
          ).slice(0, 10)
        }
      })
    )
  

  getConfig() {
    this.http.get('http://localhost:3000/api/typeahead/cars').subscribe(
      (config: CarTypeaheadConf) => { 
        this.config = {
          makes: config['makes'],
          models: config['models'],
          parts: config['parts'],
          vins: this.parseVins(config['vins'])
        };
        console.log(this.config);
      }
    );
  }

  parseVins(vinRangeList) {
    return vinRangeList.map( ([first, last]) => { 
      const a = []; 
      for (let x = first; x <= last; x++) { a.push(x) }; 
      return a 
    }).reduce((acc, item) => acc.concat(item))
      .map(int => int.toString())
  }


}

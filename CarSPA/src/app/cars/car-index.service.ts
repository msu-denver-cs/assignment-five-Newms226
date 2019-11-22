import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Car } from './car.model';

@Injectable({
  providedIn: 'root'
})
export class CarIndexService {
  private apiRoot = 'http://localhost:3000/api/'

  constructor(private http: HttpClient) {}

  get_cars() {
    return this.http.get(this.apiRoot + 'cars/18267.json')
  }
}

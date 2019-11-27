import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Status } from './status/status.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiRoot = 'http://localhost:3000/api'

  constructor(private http: HttpClient) {}

  getStatus() {
    return this.http.get(`${this.apiRoot}/status`)
  }

  get_cars(page: Number, order: String) {
    return this.load(page, order, 'make', 'cars.json')
  }

  get_makes(page: Number, order: String) {
    return this.load(page, order, 'name', 'makes.json')
  }

  get_parts(page: Number, order: String) {
    return this.load(page, order, '', 'parts.json')
  }

  private load(page: Number, order: String, defaultOrder: String, url: String) {
    let spage = page || 1
    let sorder = order || defaultOrder
    return this.http.get(this.apiRoot + url + "?order=" + sorder + '&page=' + spage)
  }
}

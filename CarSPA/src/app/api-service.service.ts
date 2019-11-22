import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiRoot = 'http://localhost:3000/api/'

  constructor(private http: HttpClient) {}

  get_cars(page: Number, order: String) {
    let spage = page|| 1
    let sorder = order || 'make' // if you EVER pass in dynamic values here, SANTIZE!
    return this.http.get(this.apiRoot + 'cars.json?order=' + sorder + '&page=' + spage)
  }
}

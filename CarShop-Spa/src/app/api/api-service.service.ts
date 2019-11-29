import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { APIResponse } from './query/query-response.model'
import { Observable } from 'rxjs';
import { Query } from './query/query.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiRoot: string = 'http://localhost:3000/api'

  constructor(private http: HttpClient) {}

  getStatus() {
    return this.http.get(`${this.apiRoot}/status`)
  }

  get<T>(query: Query): Observable<APIResponse<T>> {
    return this.http.get<APIResponse<T>>(
      `${this.apiRoot}/${query.table}.json?${this.queryToString(query)}`
    )
  }

  queryToString(query: Query): string {
    const paramStr = Object.entries(query.params)
      .filter(([key, value]) => value !== '') // TODO: remove spaces!!
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    console.log('Read from param string: ' + paramStr);
    return paramStr;
    // for (const propertyKey in query.params) {
    //     const value = query[propertyKey];
    //     console.log('key: ' + propertyKey + ' value: ' + value);
    //     str += `${propertyKey}=${query[propertyKey]}`;
    // }
    // return str;
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

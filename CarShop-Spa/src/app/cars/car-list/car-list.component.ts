import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api-service.service';
import { Car } from '../car.model'
import { APIResponse } from 'src/app/api/query/query-response.model';
import { Query } from 'src/app/api/query/query.model';


@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  response: APIResponse<Car>;
  _order: string;
  public model: string;

  get order() { return this._order }
  set order(v) { this._order = v; console.log('NEW ORDER: ' + v);}

  search = () => {[]}

  constructor(private apiService: ApiService) {
    this.response = {
      meta: { total: 0 },
      data: []
    }
    this.order = ''
  }

  ngOnInit() {
    this.update({table: 'cars', params: {page: 1}})
  }

  update(query: Query) {
    this.apiService.get<Car>(query).subscribe((data: APIResponse<Car>) => {
      this.response = {
        meta: data['meta'],
        data: data.data.map(car => new Car(
          car['id'],
          car['model'],
          car['vin'],
          car['url'],
          car['make'],
          car['parts'],
        ))
      }
    })
  }

}

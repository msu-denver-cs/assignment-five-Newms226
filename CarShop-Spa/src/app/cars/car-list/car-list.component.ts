import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api-service.service';
import { Car } from '../car.model'
import { APIResponse } from 'src/app/api/query/query-response.model';
import { Query, QueryParams } from 'src/app/api/query/query.model';
import { TypeaheadService } from 'src/app/api/typeahead/typeahead.service';
import { Observable } from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

interface CarSearchState extends QueryParams {
  part: string;
  make: string;
  model: string;
  vin: string;
}

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  response: APIResponse<Car>;
  public state: CarSearchState;

  get order() { return this.state.model }
  set order(v) { 
    this.state.order = v; 
    console.log('NEW ORDER: ' + v);
    this.update();
  }
  
  constructor(
    private apiService: ApiService, 
    private typeahead: TypeaheadService) { }

  ngOnInit() {
    this.response = {
      meta: { total: 0 },
      data: []
    }
    this.state = {
      part: '',
      make: '',
      model: '',
      vin: '',
      page: 1,
      order: ''
    }
    
    this.update()
    console.log('ngOnInit call')
  }

  update() {
    console.log('query call')
    const query = {table: 'cars', params: this.state}
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

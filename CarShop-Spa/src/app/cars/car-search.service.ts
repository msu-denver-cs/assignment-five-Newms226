// inspiration: https://ng-bootstrap.github.io/#/components/table/examples#complete
import { Injectable } from '@angular/core';

import { Car } from './car.model';
import { QueryParams } from '../api/query/query.model'
import { SearchService } from '../api/search.service';
import { ApiService } from '../api/api-service.service';

export const DEFAULT_CAR_PARAMS: CarSearchState = {
  part: '',
  make: '',
  model: '',
  vin: ''
};


export interface CarSearchState extends QueryParams {
  part: string;
  make: string;
  model: string;
  vin: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarSearchService extends SearchService<Car, CarSearchState> {

  // _state: CarSearchState = {...DEFAULT_CAR_PARAMS};

  constructor(api: ApiService) {
    super('cars', api, DEFAULT_CAR_PARAMS);
  }
  
  get make() { return this._state.make; }
  get model() { return this._state.model; }
  get vin() { return this._state.vin; }
  get part() { return this._state.part; }

  set make(make: string) { this._set({make}); }
  set model(model: string) { this._set({model}); }
  set vin(vin: string) { this._set({vin});}
  set part(part: string) { this._set({part}); }

}

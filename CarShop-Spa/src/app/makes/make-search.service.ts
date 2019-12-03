import { Injectable } from '@angular/core';
import { QueryParams } from '../api/query/query.model';
import { SearchService } from '../api/search.service';
import { Make } from './make.model';
import { ApiService } from '../api/api-service.service';

export interface MakeParams extends QueryParams {
  name: string;
  country: string;
}

@Injectable({
  providedIn: 'root'
})
export class MakeSearchService extends SearchService<Make, MakeParams> {

  _state: MakeParams = {
    name: '',
    country: ''
  }

  constructor(api: ApiService) {
    super('makes', api)
  }

  get name() { return this._state.name; }
  get country() { return this._state.country; }

  set name(name: string) { this._set({name}); }
  set country(country: string) { this._set({country}); }
}

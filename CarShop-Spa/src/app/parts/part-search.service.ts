import { Injectable } from '@angular/core';
import { QueryParams } from '../api/query/query.model';
import { SearchService } from '../api/search.service';
import { Part } from './part.model';
import { ApiService } from '../api/api-service.service';

export interface PartParams extends QueryParams {
  name: string;
}

export const DEFAULT_PART_PARMS: PartParams = {
  name: ''
}

@Injectable({
  providedIn: 'root'
})
export class PartSearchService extends SearchService<Part, PartParams> {
  
  constructor(api: ApiService) {
    super('parts', api, DEFAULT_PART_PARMS);
   }

   get name() { return this._state.name; }

   set name(name: string) { this._set({name}); }
}

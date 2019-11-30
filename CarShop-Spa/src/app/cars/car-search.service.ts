// inspiration: https://ng-bootstrap.github.io/#/components/table/examples#complete
import { Injectable, PipeTransform } from '@angular/core';
import {DecimalPipe} from '@angular/common';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {debounceTime, delay, switchMap, tap, mergeMap} from 'rxjs/operators';

import { Car } from './car.model';
import { APIResponse } from '../api/query/query-response.model';
import { QueryParams } from '../api/query/query.model'
import { ApiService } from '../api/api-service.service';


export interface CarSearchState extends QueryParams {
  part: string;
  make: string;
  model: string;
  vin: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarSearchService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _total$ = new BehaviorSubject<number>(0);
  private _count$ = new BehaviorSubject<number>(0);

  private _cars$ = new BehaviorSubject<Car[]>([]);
  private _last$ = new BehaviorSubject<Car>(null); // TODO this is probably a bad idea

  private _state: CarSearchState = {
    page: 1,
    perpage: 24,
    part: '',
    make: '',
    model: '',
    vin: '',
    order: '',
  };

  constructor(private api: ApiService) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe((result: APIResponse<Car>) => {
      this._parse(result);
    });
    
    this._search$.next();
  }

  get cars$() { return this._cars$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get count$() { return this._count$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }

  get order() { return this._state.order}
  get perPage() { return this._state.perpage; }

  get make() { return this._state.make; }
  get model() { return this._state.model; }
  get vin() { return this._state.vin; }
  get part() { return this._state.part; }

  set perPage(perpage: number) { this._set({perpage}); }
  set order(order: string) { this._set({order}); }

  set make(make: string) { this._set({make}); }
  set model(model: string) { this._set({model}); }
  set vin(vin: string) { this._set({vin});}
  set part(part: string) { this._set({part}); }

  get page() { return this._state.page; }
  set page(page: number) { this._state.page = page }

  loadMore() {
    this.page++;
    this._search().subscribe((result: APIResponse<Car>) => {
      this._append(result);
    });
  }

  // set page(page: number) { this._set_page({page}); }

  private _set(patch: Partial<CarSearchState>) {
    Object.assign(this._state, patch);
    console.log('NEW STATE: ');
    console.log(this._state);
    this._search$.next();
  }

  private _search(): Observable<APIResponse<Car>> {
    const query = {
      table: 'cars',
      params: this._state
    }

    return this.api.get<Car>(query);
  }

  private _parse(result: APIResponse<Car>) {
    const data: Car[] = result.data.slice(0, result.data.length - 2);
    const last: Car = result.data[result.data.length - 1];

    this._last$.next(last);
    this._cars$.next(data);
    this._total$.next(result.meta.total);
    this._count$.next(result.meta.count);
  }

  private _append(result: APIResponse<Car>) {
    let data: Car[] = result.data.slice(0, result.data.length - 2);
    const last: Car = result.data[result.data.length - 1];

    data = this._cars$.value.concat(data);

    this._last$.next(last);
    this._cars$.next(data);
    this._total$.next(result.meta.total);
    this._count$.next(result.meta.count);
  }
}

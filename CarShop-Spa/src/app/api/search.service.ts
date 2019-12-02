import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { APIResponse, APIMeta } from './query/query-response.model';
import { QueryParams } from './query/query.model';
import { ApiService } from './api-service.service';
@Injectable({
  providedIn: 'root'
})
export abstract class SearchService<T, PARAM> {
  abstract _state: QueryParams;

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _paginator$ = new Subject<void>();
  private _data$ = new BehaviorSubject<T[]>([]);
  private _meta$ = new BehaviorSubject<APIMeta>({
    total: 0
  });

  private _pastFirstLoad: boolean = false;
  private _superState = {
    page: 1,
    perpage: 24,
    order: '',
  };

  constructor(public table: string, private api: ApiService) {
    this._search$.pipe(tap(() => this._loading$.next(true)), debounceTime(200), switchMap(() => this._search()), delay(200), tap(() => this._loading$.next(false))).subscribe((result: APIResponse<T>) => {
      console.log('INIT LOAD');
      this._parse(result);
      this._pastFirstLoad = true;
    });
    this._paginator$.pipe(tap(() => this._loading$.next(true)), switchMap(() => this._search()), tap(() => this._loading$.next(false))).subscribe((result: APIResponse<T>) => {
      console.log('NEW LOAD');
      this._append(result);
    });
    this._search$.next();
  }

  get data$() { return this._data$.asObservable(); }
  get meta$() { return this._meta$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._superState.page; }
  get order() { return this._superState.order; }
  get perPage() { return this._superState.perpage; }
  get pastFirstLoad(): boolean { return this._pastFirstLoad; }

  set perPage(perpage: number) { this._setSuperState({ perpage }); }
  set order(order: string) { this._setSuperState({ order }); }
  set page(page: number) { this._superState.page = page; }

  loadMore(): void {
    // TODO: page out of bounds
    this.page++;
    this._paginator$.next();
  }

  hasMore(): boolean {
    console.log(`TOTAL: ${this._meta$.value.total} COUNT: ${this._meta$.value.count}`);
    if (this._meta$.value.count) {
      return this._meta$.value.total > this._meta$.value.count;
    }
    else {
      return false;
    }
  }

  _set(patch: Partial<PARAM>): void {
    Object.assign(this._state, patch);
    this.page = 1;
    console.log('NEW STATE: ');
    console.log(this._state);
    this._search$.next();
  }

  private _setSuperState(patch: Partial<QueryParams>): void {
    Object.assign(this._superState, patch);
    this.page = 1;
    console.log('NEW SUPER STATE: ');
    console.log(this._superState);
    this._search$.next();
  }

  private _search(): Observable<APIResponse<T>> {
    const query = {
      table: this.table,
      params: {...this._state, ...this._superState}
    };
    return this.api.get<T>(query);
  }

  private _parse(result: APIResponse<T>): void {
    this._data$.next(result.data);
    this._meta$.next(result.meta);
  }

  private _append(result: APIResponse<T>): void {
    let data = this._data$.value.concat(result.data);
    this._data$.next(data);
    this._meta$.next(result.meta);
  }
}

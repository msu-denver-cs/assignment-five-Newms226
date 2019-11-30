import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api-service.service';
import { Car } from '../car.model'
import { APIResponse } from 'src/app/api/query/query-response.model';
import { Query, QueryParams } from 'src/app/api/query/query.model';
import { CarTypeaheadService } from '../car-typeahead.service'
import { Observable } from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { CarSearchService } from '../car-search.service';
import { NgxMasonryOptions } from 'ngx-masonry';


@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  public masonryOptions: NgxMasonryOptions = {
		transitionDuration: '0.2s',
		// gutter: 20,
    // resize: true,
    // columnWidth: '.block',
    // itemSelector: '.block',
    // percentPosition: true,
		// initLayout: true,
    // fitWidth: true,
    // horizontalOrder: true,
    // itemSelector: '.block',
    // columnWidth: '.block',
    // gutter: 25,
    // percentPosition: true,
	};

  // response: APIResponse<Car>;
  // public state: CarSearchState;
  cars$: Observable<Car[]>;
  total$: Observable<number>;
  // loading$: Observable<boolean>;

  // get order() { return this.state.model }
  // set order(v) { 
  //   this.state.order = v; 
  //   console.log('NEW ORDER: ' + v);
  //   this.update();
  // }
  
  constructor(
    private apiService: ApiService, 
    private typeahead: CarTypeaheadService,
    private search: CarSearchService) 
  { 
    this.cars$ = search.cars$;
    this.total$ = search.total$;
    // this.loading$ = search.loading$;
  }

  ngOnInit() {
    // this.response = {
    //   meta: { total: 0 },
    //   data: []
    // }
    // this.state = {
    //   part: '',
    //   make: '',
    //   model: '',
    //   vin: '',
    //   page: 1,
    //   order: ''
    // }
    
    // this.update()
    // console.log('ngOnInit call')
  }

  // update() {
  //   console.log('query call')
  //   const query = {table: 'cars', params: this.state}
  //   this.apiService.get<Car>(query).subscribe((resp: APIResponse<Car>) => {
  //     if (resp.data.length > 0) {
  //       this.response = {
  //         meta: resp['meta'],
  //         data: resp.data.map(car => new Car(
  //           car['id'],
  //           car['model'],
  //           car['vin'],
  //           car['url'],
  //           car['make'],
  //           car['parts'],
  //         ))
  //       }
  //     } else {
  //       this.response = {
  //         meta: { total: 0 },
  //         data: [] // TODO this needs to a be a discernable item! like a symbol?
  //       }
  //     }
      
  //   })
  // }

}

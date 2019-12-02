import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs';

import { NgxMasonryOptions } from 'ngx-masonry';

import { CarSearchService, CarSearchState } from '../car-search.service';
import { APIMeta } from 'src/app/api/query/query-response.model';
import { Car } from '../car.model'
import { CarTypeaheadService } from '../car-typeahead.service'
import { AbstractListComponent } from 'src/app/api/list/list.component';


@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent extends AbstractListComponent<Car, CarSearchState> {
  constructor(private typeahead: CarTypeaheadService,search: CarSearchService){
    super(search)
  }
}
//   public masonryOptions: NgxMasonryOptions = {
// 		transitionDuration: '0.2s',
//   };
  
//   @ViewChild('anchorLast', {static: false}) anchor: ElementRef<HTMLElement>

//   cars$: Observable<Car[]>;
//   meta$: Observable<APIMeta>;

//   private _scrollObserver: IntersectionObserver;
//   private _isLeaving: boolean = true;
  
//   constructor(
//     private typeahead: CarTypeaheadService,
//     private search: CarSearchService) { }

//   ngOnInit() {
//     this.cars$ = this.search.data$;
//     this.meta$ = this.search.meta$;

//     const options = {
//       root: null,
//       threshold: .5
//     };

//     this._scrollObserver = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting && this.search.pastFirstLoad && !this._isLeaving) {
//         this._isLeaving = true;
//         this.search.loadMore();
//       } else if (this._isLeaving) {
//         this._isLeaving = false;
//       }
//     }, options);
//   }

//   changeOrder(order: string) {
//     this.search.order = order
//     this.search.page = 1
//   }

//   ngAfterViewInit() {
//     this._scrollObserver.observe(this.anchor.nativeElement);
//   }


// }

import { Component, OnInit, ViewChild, ElementRef, Output, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/api/api-service.service';
import { Car } from '../car.model'
import { CarTypeaheadService } from '../car-typeahead.service'
import { Observable } from 'rxjs';
import { CarSearchService } from '../car-search.service';
import { NgxMasonryOptions } from 'ngx-masonry';
import { EventEmitter } from 'events';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit, AfterViewInit {
  public masonryOptions: NgxMasonryOptions = {
		transitionDuration: '0.2s',
  };
  
  @ViewChild('anchorLast', {static: false}) anchor: ElementRef<HTMLElement>
  @Output() scrolled = new EventEmitter

  // cars: Car[];
  cars$: Observable<Car[]>;
  total$: Observable<number>;
  count$: Observable<number>;

  private _scrollObserver: IntersectionObserver;

  private pastFirstLoad: boolean = false;

  //

  
  constructor(
    private typeahead: CarTypeaheadService,
    private search: CarSearchService,
    private host: ElementRef) { }

  ngOnInit() {
    const options = {
      root: null,
      threshold: .5
    };

    this.total$ = this.search.total$;
    this.count$ = this.search.count$;
    this.cars$ = this.search.cars$;
    // this.cars = [];

    // this.search.cars$.subscribe((cars: Car[]) => {
    //   this.pastFirstLoad = true;
    //   this.cars = this.cars.concat(cars);
    // })

    this._scrollObserver = new IntersectionObserver(([entry]) => {
      console.log('Inside intersection observer...')
        if (entry.isIntersecting){
          console.log('INTERSECTION');
          if (this.pastFirstLoad) {
            console.log('PAST FIRST LOAD');
            this.search.loadMore();
          }
        }
      }, options);

    // this._scrollObserver.observe(this.anchor.nativeElement);

  }

  changeOrder(order: string) {
    this.search.order = order
    this.search.page = 1
  }

  ngAfterViewInit() {
    console.log('NG AFTER VIEW INIT')
    this._scrollObserver.observe(this.anchor.nativeElement);

    this.cars$.pipe(take(1)).subscribe(_ => {
      console.log('SET past first load')
      this.pastFirstLoad = true;
    })
  }


}

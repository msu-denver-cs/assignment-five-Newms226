import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs';

import { NgxMasonryOptions } from 'ngx-masonry';

import { APIMeta } from 'src/app/api/query/query-response.model';
import { SearchService } from 'src/app/api/search.service';

@Component({
  template: ''
})
export class AbstractListComponent<T, PARAM> implements OnInit, AfterViewInit {
  public masonryOptions: NgxMasonryOptions = {
		transitionDuration: '0.2s',
  };
  
  @ViewChild('anchorLast', {static: false}) anchor: ElementRef<HTMLElement>

  data$: Observable<T[]>;
  meta$: Observable<APIMeta>;

  private _scrollObserver: IntersectionObserver;
  private _isLeaving: boolean = true;
  
  constructor(
    // private typeahead: CarTypeaheadService,
    private search: SearchService<T, PARAM>) { }

  ngOnInit() {
    this.data$ = this.search.data$;
    this.meta$ = this.search.meta$;

    const options = {
      root: null,
      threshold: .5
    };

    this._scrollObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && this.search.pastFirstLoad && !this._isLeaving) {
        this._isLeaving = true;
        this.search.loadMore();
      } else if (this._isLeaving) {
        this._isLeaving = false;
      }
    }, options);
  }

  changeOrder(order: string) {
    this.search.reset();
    this.search.order = order;
  }

  ngAfterViewInit() {
    this._scrollObserver.observe(this.anchor.nativeElement);
  }

  reset() { this.search.reset(); }


}

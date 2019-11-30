import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CarSearchState } from '../car-search.service';

@Component({
  selector: 'app-car-search-bar',
  templateUrl: './car-search-bar.component.html',
  styleUrls: ['./car-search-bar.component.scss']
})
export class CarSearchBarComponent implements OnInit {

  @Output() state: EventEmitter<CarSearchState>;

  constructor() { }

  ngOnInit() { }

}

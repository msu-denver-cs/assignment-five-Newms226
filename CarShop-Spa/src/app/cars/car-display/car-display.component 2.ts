import { Component, OnInit, Input } from '@angular/core';
import { Car } from '../car.model';

@Component({
  selector: 'app-car-display',
  templateUrl: './car-display.component.html',
  styleUrls: ['./car-display.component.css']
})
export class CarDisplayComponent implements OnInit {
  @Input() car: Car;
  
  constructor() { }

  ngOnInit() {
  }

}

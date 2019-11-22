import { Component, OnInit } from '@angular/core';
import { CarIndexService } from './car-index.service';
import { Car } from './car.model';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  car = {};

  constructor(carIndexService: CarIndexService) { 
    carIndexService.get_cars().subscribe((data: Car) => this.car = {
      model: data['model'],
      make: data['make_name']
    });
  }

  ngOnInit() {
  }

}

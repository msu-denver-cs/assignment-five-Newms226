import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api-service.service';
import { Car } from '../car.model'
import { NgModule } from '@angular/compiler/src/core';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Car[]
  page: Number
  order: String

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.page = 1
    this.order = 'make'
    this.update_cars()
  }

  update_cars() {
    this.apiService.get_cars(this.page, this.order).subscribe((data: Array<Car>) => this.cars = data.map(car => {
      return new Car(
        car['id'],
        car['model'],
        car['vin'],
        car['make_name'],
        car['parts'],
        car['url'],
        car['make_id'],
        car['created_at'],
        car['updated_at'])
    }));
  }

}

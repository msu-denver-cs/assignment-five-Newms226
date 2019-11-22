import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api-service.service';
import { Car } from '../car.model'

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Car[]

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.update_cars(1, undefined)
  }

  update_cars(page: Number, order: String) {
    this.apiService.get_cars(page, order).subscribe((data: Array<Car>) => this.cars = data.map(car => {
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

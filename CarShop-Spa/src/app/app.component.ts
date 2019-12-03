import { Component } from '@angular/core';
import { SearchBarHeader } from './navbar/search-bar/search-bar.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CarSPA';
  selected = 'parts';

  cssClasses = {
    cars: {
      active: false,
      'nav-item': true
    },
    makes: {
      active: false,
      'nav-item': true
    },
    parts: {
      active: true,
      'nav-item': true
    }
  }

  changeSelected(page: string) {
    Object.entries(this.cssClasses).map(([_, value]) => {
      value.active = false;
    })
    this.cssClasses[page].active = true;
    this.selected = page;
  }
}

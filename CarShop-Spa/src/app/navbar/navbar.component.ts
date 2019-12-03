import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() selected: EventEmitter<string>;

  cssClasses = {
    cars: {
      active: true,
      'nav-item': true
    },
    makes: {
      active: false,
      'nav-item': true
    },
    parts: {
      active: false,
      'nav-item': true
    }
  }

  constructor() {
    this.selected = new EventEmitter<string>();
  }

  ngOnInit() {
  }

  changeSelected(page: string) {
    Object.entries(this.cssClasses).map(([_, value]) => {
      value.active = false;
    })
    this.cssClasses[page].active = true;
    this.selected.emit(page);
  }

}

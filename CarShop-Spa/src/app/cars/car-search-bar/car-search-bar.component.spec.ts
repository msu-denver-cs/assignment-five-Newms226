import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSearchBarComponent } from './car-search-bar.component';

describe('CarSearchBarComponent', () => {
  let component: CarSearchBarComponent;
  let fixture: ComponentFixture<CarSearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarSearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

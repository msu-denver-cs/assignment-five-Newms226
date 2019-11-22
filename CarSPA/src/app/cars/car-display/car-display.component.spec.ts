import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDisplayComponent } from './car-display.component';

describe('CarDisplayComponent', () => {
  let component: CarDisplayComponent;
  let fixture: ComponentFixture<CarDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

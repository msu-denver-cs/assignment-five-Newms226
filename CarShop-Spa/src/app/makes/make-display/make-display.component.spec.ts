import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeDisplayComponent } from './make-display.component';

describe('MakeDisplayComponent', () => {
  let component: MakeDisplayComponent;
  let fixture: ComponentFixture<MakeDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

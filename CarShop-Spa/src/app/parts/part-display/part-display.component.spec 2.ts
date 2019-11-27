import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartDisplayComponent } from './part-display.component';

describe('PartDisplayComponent', () => {
  let component: PartDisplayComponent;
  let fixture: ComponentFixture<PartDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

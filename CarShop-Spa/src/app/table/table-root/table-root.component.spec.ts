import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRootComponent } from './table-root.component';

describe('TableRootComponent', () => {
  let component: TableRootComponent;
  let fixture: ComponentFixture<TableRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

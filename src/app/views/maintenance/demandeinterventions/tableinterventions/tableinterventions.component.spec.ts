import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableinterventionsComponent } from './tableinterventions.component';

describe('TableinterventionsComponent', () => {
  let component: TableinterventionsComponent;
  let fixture: ComponentFixture<TableinterventionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableinterventionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableinterventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

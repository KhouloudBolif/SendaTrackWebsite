import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableVehiculeComponent } from './table-vehicule.component';

describe('TableVehiculeComponent', () => {
  let component: TableVehiculeComponent;
  let fixture: ComponentFixture<TableVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

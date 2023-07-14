import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeinterventionsComponent } from './Demandeinterventions.component';

describe('DemandeinterventionsComponent', () => {
  let component: DemandeinterventionsComponent;
  let fixture: ComponentFixture<DemandeinterventionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeinterventionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeinterventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

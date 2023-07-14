import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GestioncarburantTableComponent } from './gestioncarburant-table.component';
import { GestioncarburantTableModule } from './gestioncarburant-table.module';

describe('GestioncarburantTableComponent', () => {
  let component: GestioncarburantTableComponent;
  let fixture: ComponentFixture<GestioncarburantTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [GestioncarburantTableModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioncarburantTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

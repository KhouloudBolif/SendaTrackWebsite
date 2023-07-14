import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CartecarburantComponent } from './cartecarburant.component';
import { CartecarburantModule } from './cartecarburant.module';

describe('CartecarburantComponent', () => {
  let component: CartecarburantComponent;
  let fixture: ComponentFixture<CartecarburantComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CartecarburantModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartecarburantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PeagesTableComponent } from './peages-table.component';
import { PeagesTableModule } from './peages-table.module';

describe('PeagesTableComponent', () => {
  let component: PeagesTableComponent;
  let fixture: ComponentFixture<PeagesTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PeagesTableModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeagesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

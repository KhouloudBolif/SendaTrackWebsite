import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PeagesComponent } from './peages.component';
import { PeagesModule } from './peages.module';

describe('PeagesComponent', () => {
  let component: PeagesComponent;
  let fixture: ComponentFixture<PeagesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PeagesModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

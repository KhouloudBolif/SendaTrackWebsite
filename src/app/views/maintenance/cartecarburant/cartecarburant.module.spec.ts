import { TestBed } from '@angular/core/testing';

import { CartecarburantModule } from './cartecarburant.module';

describe('CartecarburantModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CartecarburantModule],
    });
  });

  it('initializes', () => {
    const module: CartecarburantModule = TestBed.inject(CartecarburantModule);
    expect(module).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PeagesModule } from './peages.module';

describe('PeagesModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PeagesModule],
    });
  });

  it('initializes', () => {
    const module: PeagesModule = TestBed.inject(PeagesModule);
    expect(module).toBeTruthy();
  });
});

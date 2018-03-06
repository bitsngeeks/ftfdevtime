import { TestBed, inject } from '@angular/core/testing';

import { IoRedirectService } from './io-redirect.service';

describe('IoRedirectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IoRedirectService]
    });
  });

  it('should be created', inject([IoRedirectService], (service: IoRedirectService) => {
    expect(service).toBeTruthy();
  }));
});

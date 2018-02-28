import { TestBed, inject } from '@angular/core/testing';

import { DevRedirectService } from './dev-redirect.service';

describe('DevRedirectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevRedirectService]
    });
  });

  it('should be created', inject([DevRedirectService], (service: DevRedirectService) => {
    expect(service).toBeTruthy();
  }));
});

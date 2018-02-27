import { TestBed, inject } from '@angular/core/testing';

import { ClientsviewService } from './clientsview.service';

describe('ClientsviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientsviewService]
    });
  });

  it('should be created', inject([ClientsviewService], (service: ClientsviewService) => {
    expect(service).toBeTruthy();
  }));
});

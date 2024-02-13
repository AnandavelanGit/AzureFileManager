import { TestBed } from '@angular/core/testing';

import { SpinnerserviceService } from './spinnerservice.service';

describe('SpinnerserviceService', () => {
  let service: SpinnerserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

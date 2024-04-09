import { TestBed } from '@angular/core/testing';

import { FilemanagerserviceService } from './filemanagerservice.service';

describe('FilemanagerserviceService', () => {
  let service: FilemanagerserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilemanagerserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

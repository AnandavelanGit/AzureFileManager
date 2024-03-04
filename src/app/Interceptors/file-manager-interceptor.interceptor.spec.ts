import { TestBed } from '@angular/core/testing';

import { FileManagerInterceptor } from './file-manager-interceptor.interceptor';

describe('FileManagerInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FileManagerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: FileManagerInterceptor = TestBed.inject(FileManagerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

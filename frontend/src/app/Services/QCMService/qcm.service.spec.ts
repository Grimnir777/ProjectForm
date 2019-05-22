import { TestBed } from '@angular/core/testing';

import { QCMService } from './qcm.service';

describe('QCMService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QCMService = TestBed.get(QCMService);
    expect(service).toBeTruthy();
  });
});

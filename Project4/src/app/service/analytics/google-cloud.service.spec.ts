import { TestBed } from '@angular/core/testing';

import { GoogleCloudService } from './google-cloud.service';

describe('GoogleCloudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleCloudService = TestBed.get(GoogleCloudService);
    expect(service).toBeTruthy();
  });
});

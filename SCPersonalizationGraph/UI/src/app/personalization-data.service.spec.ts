import { TestBed, inject } from '@angular/core/testing';

import { PersonalizationDataService } from './personalization-data.service';

describe('PersonalizationDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonalizationDataService]
    });
  });

  it('should be created', inject([PersonalizationDataService], (service: PersonalizationDataService) => {
    expect(service).toBeTruthy();
  }));
});

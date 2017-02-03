/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProgressIndicatorService } from './progress-indicator.service';

describe('ProgressIndicatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgressIndicatorService]
    });
  });

  it('should ...', inject([ProgressIndicatorService], (service: ProgressIndicatorService) => {
    expect(service).toBeTruthy();
  }));
});

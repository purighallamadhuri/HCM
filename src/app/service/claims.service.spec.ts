import { TestBed } from '@angular/core/testing';

import { ClaimsService } from './claims.service';
import { HttpClientModule } from '@angular/common/http';

describe('ClaimsService', () => {
  let service: ClaimsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers:[ClaimsService]
    });
    service = TestBed.inject(ClaimsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

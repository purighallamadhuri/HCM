import { TestBed } from '@angular/core/testing';

import { PhysicianService } from './physician.service';
import { HttpClientModule } from '@angular/common/http';

describe('PhysicianService', () => {
  let service: PhysicianService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(PhysicianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

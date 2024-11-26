import { TestBed } from '@angular/core/testing';

import { GestbuscService } from './gestbusc.service';

describe('GestbuscService', () => {
  let service: GestbuscService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestbuscService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

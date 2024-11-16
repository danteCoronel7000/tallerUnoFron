import { TestBed } from '@angular/core/testing';

import { RolToUsuarioService } from './rol-to-usuario.service';

describe('RolToUsuarioService', () => {
  let service: RolToUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolToUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

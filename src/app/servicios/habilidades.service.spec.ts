import { TestBed } from '@angular/core/testing';

import { HabilidadesService } from './habilidades.service';

describe('HabilidadesService', () => {
  let service: HabilidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabilidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

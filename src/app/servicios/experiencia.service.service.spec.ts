import { TestBed } from '@angular/core/testing';

import { ExperienciaServiceService } from './experiencia.service';

describe('ExperienciaServiceService', () => {
  let service: ExperienciaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExperienciaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

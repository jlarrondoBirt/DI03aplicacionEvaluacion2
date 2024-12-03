import { TestBed } from '@angular/core/testing';

import { GestionCapacitorStorageService } from './gestion-capacitor-storage.service';

describe('GestionCapacitorStorageService', () => {
  let service: GestionCapacitorStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionCapacitorStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

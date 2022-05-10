import { TestBed } from '@angular/core/testing';

import { AuthFirebaseServiceService } from './auth-firebase-service.service';

describe('AuthFirebaseServiceService', () => {
  let service: AuthFirebaseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthFirebaseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

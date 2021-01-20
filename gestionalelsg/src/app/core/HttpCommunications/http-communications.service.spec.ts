import { TestBed } from '@angular/core/testing';
import { HttpCommunicationsService } from './http-communications.service';




describe('HttpComunicationsService', () => {
  let service: HttpCommunicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCommunicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { CoreModule } from '../../core.module';

import { AlbumsAPIService } from './albumsAPI.service';

describe('AlbumsAPIService', () => {
  let service: AlbumsAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [AlbumsAPIService]
    });
    service = TestBed.inject(AlbumsAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

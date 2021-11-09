import { TestBed } from '@angular/core/testing';
import { ArtistsModule } from 'src/app/home/artists/artists.module';

import { ArtistService } from './artist.service';

describe('ArtistService', () => {
  let service: ArtistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArtistsModule],
    });
    service = TestBed.inject(ArtistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

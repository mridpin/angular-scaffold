import { TestBed } from '@angular/core/testing';
import { AlbumsModule } from 'src/app/home/albums/albums.module';

import { AlbumService } from './album.service';

describe('AlbumService', () => {
  let service: AlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AlbumsModule],
    });
    service = TestBed.inject(AlbumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

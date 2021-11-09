import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { CoreModule } from '../../core.module';
import { Artist, ArtistAdapter } from '../../models/artist/artist';
import { ApiService } from './api.service';

import { ArtistsAPIService } from './artistsAPI.service';

describe('ArtistsAPIService', () => {
  let service: ArtistsAPIService;
  let apiService: ApiService;
  let artistAdapter: ArtistAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [ArtistsAPIService],
    });
    service = TestBed.inject(ArtistsAPIService);
    apiService = TestBed.inject(ApiService);
    artistAdapter = TestBed.inject(ArtistAdapter);

    const expectedResponse: Observable<any[]> = mockResponseFactory();
    spyOn(apiService, 'get').and.returnValue(expectedResponse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all artists', done => {
    // given
    const expectedResult: Artist[] = expectedArtists();

    // when
    service.getArtists().subscribe((artists: Artist[]) => {
      artists.map((artist: Artist, i: number) => {
        // then
        expect(artist.id).toEqual(expectedResult[i].id);
        expect(artist.name).toEqual(expectedResult[i].name);
        // comparing timestamps avoid date format assertion errors
        expect(new Date(artist.birthdate).valueOf()).toEqual(expectedResult[i].birthdate.valueOf());
        expect(new Date(artist.deathDate!).valueOf()).toEqual(expectedResult[i].deathDate!.valueOf());
      });
      done();
    });
  });
});

function mockResponseFactory(): Observable<any[]> {
  return of([
    {
      _id: '1',
      name: 'artist1',
      photoUrl: 'placeholder/url/1',
      birthdate: '2021-01-01T00:00:00.000Z',
      deathDate: '2029-12-31T00:00:00.000Z',
    },
    {
      _id: '2',
      name: 'artist2',
      photoUrl: 'placeholder/url/2',
      birthdate: '2021-01-02T00:00:00.000Z',
      deathDate: '2029-12-31T00:00:00.000Z',
    },
    {
      _id: '3',
      name: 'artist3',
      photoUrl: 'placeholder/url/3',
      birthdate: '2021-01-03T00:00:00.000Z',
      deathDate: '2029-12-31T00:00:00.000Z',
    },
  ]);
}

function expectedArtists(): Artist[] {
  return [
    {
      id: '1',
      name: 'artist1',
      photoUrl: 'placeholder/url/1',
      birthdate: new Date('2021-01-01T00:00:00.000Z'),
      deathDate: new Date('2029-12-31T00:00:00.000Z'),
    },
    {
      id: '2',
      name: 'artist2',
      photoUrl: 'placeholder/url/2',
      birthdate: new Date('2021-01-02T00:00:00.000Z'),
      deathDate: new Date('2029-12-31T00:00:00.000Z'),
    },
    {
      id: '3',
      name: 'artist3',
      photoUrl: 'placeholder/url/3',
      birthdate: new Date('2021-01-03T00:00:00.000Z'),
      deathDate: new Date('2029-12-31T00:00:00.000Z'),
    },
  ];
}

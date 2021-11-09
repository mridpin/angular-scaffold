import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { CoreModule } from 'src/app/core/core.module';
import { Artist, ArtistAdapter } from 'src/app/core/models/artist';
import { ArtistsAPIService } from 'src/app/core/services/api/artistsAPI.service';

import { ArtistsComponent } from './artists.component';
import { ArtistsModule } from './artists.module';

describe('ArtistsComponent', () => {
  let component: ArtistsComponent;
  let fixture: ComponentFixture<ArtistsComponent>;
  let artistsAPIService: ArtistsAPIService;
  let artistAdapter: ArtistAdapter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistsComponent],
      imports: [CoreModule, ArtistsModule],
    }).compileComponents();
    artistsAPIService = TestBed.inject(ArtistsAPIService);
    artistAdapter = TestBed.inject(ArtistAdapter);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistsComponent);
    component = fixture.componentInstance;
    spyOn(artistsAPIService, 'getArtists').and.returnValue(serviceResponse());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog on create button', () => {
    // given
    const hostElement: HTMLElement = fixture.nativeElement;

    const button: HTMLLinkElement = hostElement.querySelector(
      '#add-artist-button'
    )! as HTMLLinkElement;
    const nullModal: HTMLDivElement = hostElement.querySelector(
      '#album-form-modal-container'
    )! as HTMLDivElement;
    expect(button).toBeTruthy();
    expect(nullModal).toBeFalsy();

    // when
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // then
    const realModal: HTMLDivElement = hostElement.querySelector(
      '#album-form-modal-container'
    )! as HTMLDivElement;
    expect(realModal).toBeTruthy();
  });

  it('should load data when opened', (done) => {
    // given
    const expectedResult: Artist[] = expectedArtists();

    // when
    fixture.detectChanges();

    // then
    expect(component.artists).toBeTruthy();
    component.artists.subscribe((artists: Artist[]) => {
      artists.map((artist: Artist, i: number) => {
        expect(artist.id).toEqual(expectedResult[i].id);
        expect(artist.name).toEqual(expectedResult[i].name);
        // comparing timestamps avoid date format assertion errors
        expect(new Date(artist.birthdate).valueOf()).toEqual(
          expectedResult[i].birthdate.valueOf()
        );
        expect(new Date(artist.deathDate!).valueOf()).toEqual(
          expectedResult[i].deathDate!.valueOf()
        );
      });
      done();
    });
  });
});

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

function serviceResponse(): Observable<Artist[]> {
  return of([
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
  ]);
}

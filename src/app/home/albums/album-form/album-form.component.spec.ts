import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { CoreModule } from 'src/app/core/core.module';
import { Album, AlbumAdapter } from 'src/app/core/models/album';
import { Artist, ArtistAdapter } from 'src/app/core/models/artist';
import { ArtistsAPIService } from 'src/app/core/services/api/artistsAPI.service';
import { ArtistsModule } from '../../artists/artists.module';
import { AlbumsModule } from '../albums.module';

import { AlbumFormComponent } from './album-form.component';

describe('AlbumFormComponent', () => {
  let component: AlbumFormComponent;
  let fixture: ComponentFixture<AlbumFormComponent>;
  let service: ArtistsAPIService;
  let albumAdapter: AlbumAdapter;
  let artistAdapter: ArtistAdapter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlbumFormComponent],
      imports: [ArtistsModule, CoreModule, AlbumsModule],
    }).compileComponents();
    service = TestBed.inject(ArtistsAPIService);
    albumAdapter = TestBed.inject(AlbumAdapter);
    artistAdapter = TestBed.inject(ArtistAdapter);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumFormComponent);
    component = fixture.componentInstance;
    spyOn(service, 'getArtists').and.returnValue(serviceResponse());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error messages', () => {
    // given
    component.formGroup.controls.title.setValue('');
    component.formGroup.controls.artist.setValue('');
    component.formGroup.controls.year.setValue(10);
    component.formGroup.controls.genre.setValue('');
    component.formGroup.controls.coverUrl.setValue('');

    expect(component.formGroup.controls.title.valid).toBeFalse();
    expect(component.formGroup.controls.artist.valid).toBeFalse();
    expect(component.formGroup.controls.year.valid).toBeFalse();
    expect(component.formGroup.controls.genre.valid).toBeFalse();
    expect(component.formGroup.controls.coverUrl.valid).toBeFalse();

    const hostElement: HTMLElement = fixture.nativeElement;
    const form: HTMLFormElement = hostElement.querySelector(
      '#album-form'
    )! as HTMLFormElement;

    // when
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    // then
    expect(component.hasErrors.title).toBeTrue();
    expect(component.hasErrors.artist).toBeTrue();
    expect(component.hasErrors.year).toBeTrue();
    expect(component.hasErrors.genre).toBeTrue();
    expect(component.hasErrors.coverUrl).toBeTrue();

    const errorMsgs: HTMLCollectionOf<HTMLParagraphElement> =
      document.getElementsByClassName(
        'help is-danger'
      )! as HTMLCollectionOf<HTMLParagraphElement>;
    expect(errorMsgs.length).toEqual(5);
    expect(errorMsgs[0].textContent?.trim()).toEqual('Title is required');
    expect(errorMsgs[4].textContent?.trim()).toEqual('Cover URL is required');
  });

  it('should submit form', () => {
    // given
    spyOn(component.saveEditEvent, 'emit');
    const expectedArtist: Artist = artistAdapter.adapt({
      id: 1,
      name: 'name',
      photoUrl: 'placeholder/phopo/url',
      birthdate: new Date('2021-01-01'),
      deathDate: new Date('2021-01-01'),
    });
    const expectedAlbum: Album = albumAdapter.adapt({
      id: '',
      title: 'title',
      artist: expectedArtist,
      coverUrl: 'placeholder/cover/url',
      year: 2021,
      genre: 'genre',
    });
    const inputArtist = {
      id: 1,
      name: 'name',
      birthdate: new Date('2021-01-01'),
      deathDate: new Date('2021-01-01'),
      photoUrl: 'placeholder/phopo/url',
    };
    component.formGroup.controls.title.setValue('title');
    component.formGroup.controls.artist.setValue(inputArtist);
    component.formGroup.controls.year.setValue(2021);
    component.formGroup.controls.genre.setValue('genre');
    component.formGroup.controls.coverUrl.setValue('placeholder/cover/url');

    expect(component.formGroup.controls.title.valid).toBeTrue();
    expect(component.formGroup.controls.artist.valid).toBeTrue();
    expect(component.formGroup.controls.year.valid).toBeTrue();
    expect(component.formGroup.controls.genre.valid).toBeTrue();
    expect(component.formGroup.controls.coverUrl.valid).toBeTrue();

    const hostElement: HTMLElement = fixture.nativeElement;
    const form: HTMLFormElement = hostElement.querySelector(
      '#album-form'
    )! as HTMLFormElement;

    // when
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    // then
    expect(component.hasErrors.title).toBeFalse();
    expect(component.hasErrors.artist).toBeFalse();
    expect(component.hasErrors.year).toBeFalse();
    expect(component.hasErrors.genre).toBeFalse();
    expect(component.hasErrors.coverUrl).toBeFalse();

    expect(component.saveEditEvent.emit).toHaveBeenCalled();
    expect(component.saveEditEvent.emit).toHaveBeenCalledWith(expectedAlbum);
  });
});

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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Album } from 'src/app/core/models/album';
import { Artist } from 'src/app/core/models/artist';
import { ArtistsAPIService } from 'src/app/core/services/api/artistsAPI.service';

type ErrorDict = {
  [key: string]: boolean;
};
@Component({
  selector: 'app-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.css'],
})
export class AlbumFormComponent implements OnInit {
  @Input() apiErrorMessage: string;
  @Input() album: Album | undefined;
  @Output() cancelEvent = new EventEmitter<Album>();
  @Output() saveEditEvent = new EventEmitter<Album>();
  @Output() clearErrorMessageEvent = new EventEmitter<any>();

  artists: Artist[];
  loading = true;

  formGroup: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    artist: new FormControl('', [Validators.required]),
    year: new FormControl('', [
      Validators.required,
      Validators.min(1909),
      Validators.max(2030),
      Validators.pattern('^[0-9]*$'),
    ]),
    genre: new FormControl('', [Validators.required]),
    coverUrl: new FormControl('', [Validators.required]),
  });

  hasErrors: ErrorDict = {
    title: false,
    artist: false,
    year: false,
    genre: false,
    coverUrl: false,
  };

  constructor(private artistAPIService: ArtistsAPIService) {
    this.apiErrorMessage = '';
    this.artists = [];
  }

  ngOnInit(): void {
    // Album is not undefined, we are editing
    if (this.album) {
      this.formGroup.controls.title.setValue(this.album.title);
      this.formGroup.controls.artist.setValue(this.album.artist);
      this.formGroup.controls.year.setValue(this.album.year);
      this.formGroup.controls.genre.setValue(this.album.genre);
      this.formGroup.controls.coverUrl.setValue(this.album.coverUrl);
    } else {
      // Album is undefined, we are creating
      // pass
    }
    this.artistAPIService.getArtists().subscribe((artists: Artist[]) => {
      this.artists = artists;
      this.loading = false;
    });
  }

  saveEdit(): void {
    if (this.formGroup.valid) {
      const newAlbum: Album = {
        id: this.album?.id || '',
        title: this.formGroup.controls.title.value,
        artist: this.formGroup.controls.artist.value,
        year: this.formGroup.controls.year.value,
        coverUrl: this.formGroup.controls.coverUrl.value,
        genre: this.formGroup.controls.genre.value,
      };
      this.saveEditEvent.emit(newAlbum);
    } else {
      this.hasErrors.title = !this.formGroup.controls.title.valid;
      this.hasErrors.artist = !this.formGroup.controls.artist.valid;
      this.hasErrors.year = !this.formGroup.controls.year.valid;
      this.hasErrors.genre = !this.formGroup.controls.genre.valid;
      this.hasErrors.coverUrl = !this.formGroup.controls.coverUrl.valid;
    }
  }

  cancelEdit(): void {
    this.cancelEvent.emit(this.album);
  }

  closeErrorPanel(): void {
    this.clearErrorMessageEvent.emit();
  }
}

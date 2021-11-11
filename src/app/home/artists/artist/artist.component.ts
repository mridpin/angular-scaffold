import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Artist } from 'src/app/core/models/artist';
import { ArtistsAPIService } from 'src/app/core/services/api/artistsAPI.service';
import { ArtistService } from 'src/app/core/services/artist.service';

type ErrorDict = {
  [key: string]: boolean;
};

const maxDate = new Date('2030-12-31T00:00:00.000Z');
const minDate = new Date('1909-01-01T00:00:00.000Z');

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
})
export class ArtistComponent implements OnInit {
  apiErrorMessage: string;

  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    birthdate: new FormControl('', [Validators.required]),
    deathDate: new FormControl(''),
    photoUrl: new FormControl('', [Validators.required]),
  });

  artist: Artist;
  savedMessage = '';
  returnAfterSave = false;

  hasErrors: ErrorDict = {
    name: false,
    birthdate: false,
    deathDate: false,
    photoUrl: false,
  };

  get minDate(): Date {
    return minDate;
  }

  get maxDate(): Date {
    return maxDate;
  }

  constructor(
    private route: ActivatedRoute,
    private artistsAPIService: ArtistsAPIService,
    private artistService: ArtistService,
    private router: Router
  ) {
    this.apiErrorMessage = '';
    this.artist = {
      id: '',
      name: '',
      birthdate: new Date(),
      deathDate: new Date(),
      photoUrl: '',
    };
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) =>
          this.artistsAPIService.getArtist(params.id)
        )
      )
      .subscribe((artist: Artist) => {
        this.artist = artist;
        this.artistService.setArtist(this.artist);
        this.updateFormFields();
      });
  }

  updateFormFields(): void {
    this.formGroup.controls.name.setValue(this.artist.name);
    this.formGroup.controls.birthdate.setValue(
      formatDate(this.artist.birthdate, 'yyyy-MM-dd', 'en')
    );
    this.formGroup.controls.deathDate.setValue(
      this.artist.deathDate
        ? formatDate(this.artist.deathDate, 'yyyy-MM-dd', 'en')
        : ''
    );
    this.formGroup.controls.photoUrl.setValue(this.artist.photoUrl);
  }

  editArtist(): void {
    const newArtist = {
      id: this.artist.id,
      name: this.formGroup.controls.name.value,
      birthdate: this.formGroup.controls.birthdate.value,
      deathDate: this.formGroup.controls.deathDate.value,
      photoUrl: this.formGroup.controls.photoUrl.value,
    };
    this.artistsAPIService.editArtist(newArtist).subscribe(
      (artist: Artist) => {
        this.artist = artist;
        this.artistService.setArtist(this.artist);
        this.updateFormFields();
        this.savedMessage = 'Artist saved!';
        this.returnAfterSave
          ? this.router.navigateByUrl('artists')
          : setTimeout(() => (this.savedMessage = ''), 3000);
      },
      (err: any) => {
        this.apiErrorMessage = err.error.error;
      }
    );
  }

  closeErrorPanel(): void {
    this.apiErrorMessage = '';
  }
}

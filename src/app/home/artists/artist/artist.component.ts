import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Artist } from 'src/app/core/models/artist';

type ErrorDict = {
  [key: string]: boolean;
};

const maxDate = new Date('2030-12-31T00:00:00.000Z');
const minDate = new Date('1909-01-01T00:00:00.000Z');

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  @Input() apiErrorMessage: string;
  // instead of input, we get from db, using route id, or even a resolver
  @Input() artist: Artist | undefined;
  @Output() cancelEvent = new EventEmitter<Artist>();
  @Output() saveEditEvent = new EventEmitter<Artist>();
  @Output() clearErrorMessageEvent = new EventEmitter<any>();

  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    // todo: add a proper custom date validator
    birthdate: new FormControl('', [Validators.required]),
    deathDate: new FormControl(''),
    photoUrl: new FormControl('', [Validators.required]),
  });

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

  constructor() {
    this.apiErrorMessage = '';
  }

  ngOnInit(): void {
    // Artist is not undefined, we are editing
    if (this.artist) {
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
    } else {
      // Artist is undefined, we are creating
      // pass
    }
  }

  saveEdit(): void {
    if (this.formGroup.valid) {
      const newArtist: Artist = {
        id: this.artist?.id || '',
        name: this.formGroup.controls.name.value,
        birthdate: this.formGroup.controls.birthdate.value,
        photoUrl: this.formGroup.controls.photoUrl.value,
        deathDate: this.formGroup.controls.deathDate.value,
      };
      this.saveEditEvent.emit(newArtist);
    } else {
      this.hasErrors.name = !this.formGroup.controls.name.valid;
      this.hasErrors.birthdate = !this.formGroup.controls.birthdate.valid;
      this.hasErrors.deathDate = !this.formGroup.controls.deathDate.valid;
      this.hasErrors.photoUrl = !this.formGroup.controls.photoUrl.valid;
    }
  }

  cancelEdit(): void {
    this.cancelEvent.emit(this.artist);
  }

  closeErrorPanel(): void {
    this.clearErrorMessageEvent.emit();
  }

}

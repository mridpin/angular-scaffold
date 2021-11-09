import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/core/models/artist';
import { ArtistService } from 'src/app/core/services/artist.service';
import { ArtistsAPIService } from 'src/app/core/services/api/artistsAPI.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css'],
})
export class ArtistsComponent implements OnInit {
  isEdit: boolean;
  editedArtist: Artist | undefined;
  apiErrorMessage: string;
  innerWidth: number;

  get artists(): Observable<Artist[]> {
    return this.artistService.artists;
  }

  constructor(
    private artistsAPIService: ArtistsAPIService,
    private artistService: ArtistService
  ) {
    this.apiErrorMessage = '';
    this.isEdit = false;
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.artistsAPIService
      .getArtists()
      .subscribe((artists: Artist[]) => this.artistService.setArtists(artists));
  }

  openCreateDialog(): void {
    this.isEdit = true;
  }

  saveArtist(artist: Artist): void {
    if (artist.id) {
      this.editArtist(artist);
    } else {
      this.createArtist(artist);
    }
  }

  createArtist(artist: Artist): void {
    this.artistsAPIService.createArtist(artist).subscribe(
      (res: any) => {
        this.resetForm();
        this.artistsAPIService
          .getArtists()
          .subscribe((artists: Artist[]) => this.artistService.setArtists(artists));
      },
      (err: any) => {
        // Note: for better user experience, we would translate the server error message to something more user friendly.
        // I skipped this process for time constraint reasons.
        this.apiErrorMessage = err.error.error;
      }
    );
  }

  deleteArtist(artist: Artist): void {
    if (confirm('Please note that this delete operation cannot be undone.')) {
      this.artistsAPIService.deleteArtist(artist.id).subscribe(
        (res: any) => {
          this.clearErrorMessage();
          this.artistsAPIService
            .getArtists()
            .subscribe((artists: Artist[]) =>
              this.artistService.setArtists(artists)
            );
        },
        (err: any) => {
          this.apiErrorMessage = err.error.error;
        }
      );
    }
  }

  closeModal(): void {
    this.isEdit = false;
    this.editedArtist = undefined;
    this.apiErrorMessage = '';
  }

  clearErrorMessage(): void {
    this.apiErrorMessage = '';
  }

  openEditDialog(artist: Artist): void {
    this.isEdit = true;
    this.editedArtist = artist;
  }

  editArtist(artist: Artist): void {
    this.artistsAPIService.editArtist(artist).subscribe(
      (res: any) => {
        this.resetForm();
        this.artistsAPIService
          .getArtists()
          .subscribe((artists: Artist[]) => this.artistService.setArtists(artists));
      },
      (err: any) => {
        this.apiErrorMessage = err.error.error;
      }
    );
  }

  private resetForm(): void {
    this.isEdit = false;
    this.clearErrorMessage();
    this.editedArtist = undefined;
  }

  // https://stackoverflow.com/a/45350792/11829823
  @HostListener('window:resize', ['$event'])
  // tslint:disable-next-line: typedef
  private onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
}

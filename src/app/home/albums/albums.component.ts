import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Album, AlbumAdapter, AlbumDTO } from 'src/app/core/models/album/album';
import { Artist } from 'src/app/core/models/artist/artist';
import { AlbumService } from 'src/app/core/services/album.service';
import { AlbumsAPIService } from 'src/app/core/services/api/albumsAPI.service';
import { ArtistsAPIService } from 'src/app/core/services/api/artistsAPI.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
})
export class AlbumsComponent implements OnInit {
  isEdit: boolean;
  editedAlbum: Album | undefined;
  apiErrorMessage: string;
  innerWidth: number;

  get albums(): Observable<Album[]> {
    return this.albumService.albums;
  }

  constructor(
    private albumsAPIService: AlbumsAPIService,
    private artistsAPIService: ArtistsAPIService,
    private albumService: AlbumService,
    private albumAdapter: AlbumAdapter
  ) {
    this.apiErrorMessage = '';
    this.isEdit = false;
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.albumsAPIService.getAlbums().subscribe((albums: Album[]) => {
      this.albumService.setAlbums(albums);
    });
  }

  openCreateDialog(): void {
    this.isEdit = true;
  }

  saveAlbum(album: Album): void {
    if (album.id) {
      this.editAlbum(album);
    } else {
      this.createAlbum(album);
    }
  }

  createAlbum(album: Album): void {
    this.albumsAPIService.createAlbum(album).subscribe(
      (res: any) => {
        this.resetForm();
        this.albumsAPIService
          .getAlbums()
          .subscribe((albums: Album[]) => this.albumService.setAlbums(albums));
      },
      (err: any) => {
        // Note: for better user experience, we would translate the server error message to something more user friendly.
        // I skipped this process for time constraint reasons.
        this.apiErrorMessage = err.error.error;
      }
    );
  }

  deleteAlbum(album: Album): void {
    if (confirm('Please note that this delete operation cannot be undone.')) {
      this.albumsAPIService.deleteAlbum(album.id).subscribe(
        (res: any) => {
          this.clearErrorMessage();
          this.albumsAPIService
            .getAlbums()
            .subscribe((albums: Album[]) =>
              this.albumService.setAlbums(albums)
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
    this.editedAlbum = undefined;
    this.apiErrorMessage = '';
  }

  clearErrorMessage(): void {
    this.apiErrorMessage = '';
  }

  openEditDialog(album: Album): void {
    this.isEdit = true;
    this.editedAlbum = album;
  }

  editAlbum(album: Album): void {
    this.albumsAPIService.editAlbum(album).subscribe(
      (res: any) => {
        this.resetForm();
        this.albumsAPIService
          .getAlbums()
          .subscribe((albums: Album[]) => this.albumService.setAlbums(albums));
      },
      (err: any) => {
        this.apiErrorMessage = err.error.error;
      }
    );
  }

  private resetForm(): void {
    this.isEdit = false;
    this.clearErrorMessage();
    this.editedAlbum = undefined;
  }

  // https://stackoverflow.com/a/45350792/11829823
  @HostListener('window:resize', ['$event'])
  // tslint:disable-next-line: typedef
  private onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AlbumsAPIService } from './services/api/albumsAPI.service';
import { ApiService } from './services/api/api.service';
import { AlbumAdapter } from './models/album/album';
import { ArtistAdapter } from './models/artist/artist';
import { ArtistsAPIService } from './services/api/artistsAPI.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    CoreModule,
    AlbumsAPIService,
    ArtistsAPIService,
    AlbumAdapter,
    ArtistAdapter,
    ApiService
  ]
})
export class CoreModule { }

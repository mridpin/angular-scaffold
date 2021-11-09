import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Album, AlbumAdapter, AlbumDTO } from '../../models/album/album';
import { Artist } from '../../models/artist/artist';
import { ApiService } from './api.service';
import { ArtistsAPIService } from './artistsAPI.service';

@Injectable()
export class AlbumsAPIService {
  constructor(
    private apiService: ApiService,
    private albumAdapter: AlbumAdapter,
    private artistsAPIService: ArtistsAPIService
  ) {}

  // this is super slow, but it is required because the api does not return a artist object with the
  // albums, just the id
  getAlbums(): Observable<Album[]> {
    return this.getAlbumsDTO().pipe(
      mergeMap((albumDTOs: AlbumDTO[]) => {
        // forkjoin https://stackoverflow.com/a/55629858
        return forkJoin(
          albumDTOs.map((albumDTO: AlbumDTO) => {
            return this.linkAlbumAndArtist(albumDTO).pipe(
              map((album: Album) => album)
            );
          })
        );
      })
    );
  }

  private getAlbumsDTO(): Observable<AlbumDTO[]> {
    const url = environment.apiUrl + '/albums/all';
    return this.apiService.get(url);
  }

  private linkAlbumAndArtist(albumDTO: AlbumDTO): Observable<Album> {
    return this.artistsAPIService.getArtist(albumDTO.artistId).pipe(
      map((artist: Artist) => {
        const album = this.albumAdapter.adapt(albumDTO);
        album.artist = artist;
        return album;
      })
    );
  }

  createAlbum(album: Album): Observable<Album> {
    const url = environment.apiUrl + '/album';
    const payload = this.albumAdapter.serialize(album);
    return this.apiService.post(url, payload);
  }

  editAlbum(album: Album): Observable<Album> {
    const url = environment.apiUrl + '/album' + '/' + album.id;
    const payload = this.albumAdapter.serialize(album);
    return this.apiService.put(url, payload);
  }

  deleteAlbum(albumId: string): Observable<Album> {
    const url = environment.apiUrl + '/album' + '/' + albumId;
    return this.apiService.delete(url);
  }
}

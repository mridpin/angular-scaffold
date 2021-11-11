import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Artist, ArtistAdapter } from '../../models/artist';
import { ApiService } from './api.service';

@Injectable()
export class ArtistsAPIService {
  constructor(
    private apiService: ApiService,
    private artistAdapter: ArtistAdapter
  ) { }

  getArtists(): Observable<Artist[]> {
    const url = environment.apiUrl + '/artists/all';
    return this.apiService
      .get(url)
      .pipe(
        map((res: any[]) =>
          res.map((artist: any) => this.artistAdapter.adapt(artist))
        )
      );
  }

  getArtist(id: string): Observable<Artist> {
    const url = environment.apiUrl + '/artist/' + id;
    return this.apiService.get(url).pipe(
      map((res: any) => this.artistAdapter.adapt(res))
    );
  }

  createArtist(artist: Artist): Observable<Artist> {
    const url = environment.apiUrl + '/artist';
    const payload = {
      name: artist.name,
      photoUrl: artist.photoUrl,
      birthdate: artist.birthdate,
      deathDate: artist.deathDate,
    };
    return this.apiService.post(url, payload);
  }

  editArtist(artist: Artist): Observable<Artist> {
    const url = environment.apiUrl + '/artist' + '/' + artist.id;
    return this.apiService.put(url, artist).pipe(
      map((res: any) => this.artistAdapter.adapt(res))
    );
  }

  deleteArtist(artistId: string): Observable<Artist> {
    const url = environment.apiUrl + '/artist' + '/' + artistId;
    return this.apiService.delete(url);
  }
}

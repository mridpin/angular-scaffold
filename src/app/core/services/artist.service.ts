import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Artist } from '../models/artist';

@Injectable()
export class ArtistService {

  private $artists = new BehaviorSubject<Artist[]>([]);
  private $artist = new BehaviorSubject<Artist>({
    id: '',
    name: '',
    birthdate: new Date(),
    deathDate: new Date(),
    photoUrl: '',
  });

  get artists(): Observable<Artist[]> {
    return this.$artists.asObservable();
  }

  setArtists(artists: Artist[]): void {
    this.$artists.next(artists);
  }

  get artist(): Observable<Artist> {
    return this.$artist.asObservable();
  }

  setArtist(artist: Artist): void {
    this.$artist.next(artist);
  }

  constructor() { }
}

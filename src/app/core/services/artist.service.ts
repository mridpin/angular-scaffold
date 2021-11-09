import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Artist } from '../models/artist';

@Injectable()
export class ArtistService {

  private $artists = new BehaviorSubject<Artist[]>([]);

  get artists(): Observable<Artist[]> {
    return this.$artists.asObservable();
  }

  setArtists(artists: Artist[]): void {
    this.$artists.next(artists);
  }

  constructor() { }
}

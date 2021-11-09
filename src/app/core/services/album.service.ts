import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Album } from '../models/album';

@Injectable()
export class AlbumService {

  private $albums = new BehaviorSubject<Album[]>([]);

  get albums(): Observable<Album[]> {
    return this.$albums.asObservable();
  }

  setAlbums(albums: Album[]): void {
    this.$albums.next(albums);
  }

  constructor() { }
}

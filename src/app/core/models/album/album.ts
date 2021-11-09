import { Injectable } from '@angular/core';
import { Artist, ArtistAdapter } from '../artist/artist';
import { Adapter } from '../utils/adapter';

export interface Album {
  id: string;
  title: string;
  artist: Artist;
  coverUrl: string;
  year: number;
  genre: string;
}

export interface AlbumDTO {
  id: string;
  title: string;
  artistId: string;
  coverUrl: string;
  year: number;
  genre: string;
}

@Injectable()
export class AlbumAdapter implements Adapter<Album> {
  constructor(private artistAdapter: ArtistAdapter) {}

  adapt(item: any): Album {
    return {
      id: item._id || item.id,
      title: item.title,
      artist: item.artist,
      coverUrl: item.coverUrl,
      year: item.year,
      genre: item.genre,
    };
  }

  serialize(item: Album): AlbumDTO {
    return {
      id: item.id,
      title: item.title,
      artistId: item.artist.id,
      coverUrl: item.coverUrl,
      year: item.year,
      genre: item.genre,
    };
  }
}

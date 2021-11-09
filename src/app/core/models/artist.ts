import { Injectable } from '@angular/core';
import { Adapter } from './utils/adapter';

export interface Artist {
    id: string;
    name: string;
    photoUrl: string;
    birthdate: Date;
    deathDate: Date | undefined;
}

@Injectable()
export class ArtistAdapter implements Adapter<Artist> {
    adapt(item: any): Artist {
        return {
            id: item._id || item.id,
            name: item.name,
            photoUrl: item.photoUrl,
            birthdate: item.birthdate,
            deathDate: item.deathDate
        };
    }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistComponent } from './artist/artist.component';
import { ArtistsComponent } from './artists.component';

const routes: Routes = [
  { path: '', component: ArtistsComponent },
  { path: 'artist/:id', component: ArtistComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistsRoutingModule { }

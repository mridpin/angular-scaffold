import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: 'albums',
    component: HomeComponent,
    loadChildren: () => import('./albums/albums.module').then((m) => m.AlbumsModule),
  },
  {
    component: HomeComponent,
    path: 'artists',
    loadChildren: () => import('./artists/artists.module').then((m) => m.ArtistsModule),
  },
  {
    path: '',
    redirectTo: 'albums',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

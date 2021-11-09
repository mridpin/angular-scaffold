import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { SharedComponentsModule } from '../shared/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArtistsComponent } from './artists.component';
import { ArtistsRoutingModule } from './artists-routing.module';
import { ArtistService } from 'src/app/core/services/artist.service';
import { ArtistFormComponent } from './artist-form/artist-form.component';

@NgModule({
  declarations: [ArtistsComponent, ArtistFormComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    ArtistsRoutingModule,
  ],
  providers: [
    ArtistService
  ]
})
export class ArtistsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { AlbumsComponent } from './albums.component';
import { AlbumsRoutingModule } from './albums-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlbumFormComponent } from './album-form/album-form.component';
import { SharedComponentsModule } from '../shared/shared-components.module';
import { AlbumService } from 'src/app/core/services/album.service';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    AlbumsComponent,
    AlbumFormComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    AlbumsRoutingModule,
    NgSelectModule
  ],
  providers: [
    AlbumService
  ]
})
export class AlbumsModule { }

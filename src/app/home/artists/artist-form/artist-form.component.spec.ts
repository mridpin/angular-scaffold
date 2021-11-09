import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistsModule } from '../artists.module';

import { ArtistFormComponent } from './artist-form.component';

describe('ArtistFormComponent', () => {
  let component: ArtistFormComponent;
  let fixture: ComponentFixture<ArtistFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistFormComponent],
      imports: [ArtistsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

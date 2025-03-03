import { Component, Input } from '@angular/core';
import { TvShow } from '../../core/models/tv-show/tv-show.module';

@Component({
  selector: 'app-tv-show-details',
  imports: [],
  templateUrl: './tv-show-details.component.html',
  styleUrl: './tv-show-details.component.scss'
})
export class TvShowDetailsComponent {
 @Input() tvShow!: TvShow;

 selectedTvShow: TvShow | null = null;
}

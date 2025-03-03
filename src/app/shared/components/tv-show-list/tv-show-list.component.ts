import { Component, Input } from '@angular/core';
import { TvShow } from '../../../core/models/tv-show/tv-show.module';

@Component({
  selector: 'app-tv-show-list',
  imports: [],
  templateUrl: './tv-show-list.component.html',
  styleUrl: './tv-show-list.component.scss'
})
export class TvShowListComponent {

  @Input() tvshow!: TvShow;
}

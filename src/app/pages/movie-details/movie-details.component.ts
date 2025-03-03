import { Component, Input } from '@angular/core';
import { Movie } from '../../core/models/movie/movie.module';

@Component({
  selector: 'app-movie-details',
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {

  @Input() movie: Movie | null = null;
}

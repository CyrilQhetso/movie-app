import { Component, Input } from '@angular/core';
import { Movie } from '../../../core/models/movie/movie.module';

@Component({
  selector: 'app-movie-list',
  imports: [],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {

  @Input() movie!: Movie
}

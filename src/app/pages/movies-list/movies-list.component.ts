import { Component, Input } from '@angular/core';
import { MovieCardComponent } from "../../shared/components/movie-card/movie-card.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../core/models/movie/movie.module';
import { EmptyStateComponent } from "../../shared/components/empty-state/empty-state.component";

@Component({
  selector: 'app-movies-list',
  imports: [
    MovieCardComponent,
    CommonModule,
    FormsModule,
    EmptyStateComponent
],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss'
})
export class MoviesListComponent {

  movies: Movie[] = [];
}

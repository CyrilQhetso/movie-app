import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../models/pagination/pagination.module';
import { Movie } from '../models/movie/movie.module';
import { MovieDetails } from '../models/movie-details/movie-details.module';
import { TvShow } from '../models/tv-show/tv-show.module';
import { TvShowDetails } from '../models/tv-show-details/tv-show-details.module';
import { Genre } from '../models/genre/genre.module';

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {

  constructor(private http: HttpClient) { }

   // Helper method to build build API URL
  private getUrl(endpoint: string): string {
    return `${environment.tmdbBaseUrl}/${endpoint}`;
  }
  // Helper Method to add API key to params
  private getParams(params: any = {} ): HttpParams {
    return new HttpParams({
      fromObject: {
        api_key: environment.tmdbApiKey,
        ...params
      }
    });
  }

  // Movies methods
  getPopularMovies(page: number = 1): Observable<PaginatedResponse<Movie>> {
    return this.http.get<PaginatedResponse<Movie>>(
      this.getUrl('movie/popular'),
      { params: this.getParams({ page })}
    );
  }

  getTopRatedMovies(page: number = 1): Observable<PaginatedResponse<Movie>> {
    return this.http.get<PaginatedResponse<Movie>>(
      this.getUrl('movie/top_rated'),
      { params: this.getParams({ page })}
    );
  }

  getMovieDetails(id: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      this.getUrl(`movie/${id}`),
      { params: this.getParams({ append_to_response: 'credits'}) }
    );
  }

  // TV shows methods
  getPopularTvShows(page: number = 1): Observable<PaginatedResponse<TvShow>> {
    return this.http.get<PaginatedResponse<TvShow>>(
      this.getUrl('tv/popular'),
      { params: this.getParams({ page })}
    );
  }

  getTopRatedTvshows(page: number = 1): Observable<PaginatedResponse<TvShow>> {
    return this.http.get<PaginatedResponse<TvShow>>(
      this.getUrl('tv/top_rated'), {
        params: this.getParams({ page })
      }
    );
  }

  getTvShowDetails(id: number): Observable<TvShowDetails> {
    return this.http.get<TvShowDetails>(
      this.getUrl(`tv/${id}`), 
      { params: this.getParams({ append_to_respones: 'credits'})}
    );
  }

  // Search Method
  searchMovies(query: string, page: number = 1): Observable<PaginatedResponse<Movie>> {
    return this.http.get<PaginatedResponse<Movie>>(
      this.getUrl('serch/movie'),
      { params: this.getParams({ query, page}) }
    );
  }

  searchTvShows(query: string, page: number = 1): Observable<PaginatedResponse<TvShow>> {
    return this.http.get<PaginatedResponse<TvShow>>(
      this.getUrl('search/tv'),
      { params: this.getParams({ query, page})}
    );
  }

  // Genres methods
  getMovieGenres(): Observable<{ genre: Genre[] }> {
    return this.http.get<{ genre: Genre[] }>(
      this.getUrl('genre/movie/list'), 
      { params: this.getParams() }
    );
  }

  getTvGenres(): Observable<{ genre: Genre[] }> {
    return this.http.get<{ genre: Genre[] }>(
      this.getUrl('genre/tv/list'),
      { params: this.getParams() }
    );
  }
}

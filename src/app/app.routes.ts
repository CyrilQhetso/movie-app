import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TvShowsListComponent } from './pages/tv-shows-list/tv-shows-list.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { TvShowDetailsComponent } from './pages/tv-show-details/tv-show-details.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'tv-shows', component: TvShowsListComponent },
    { path: 'movie/:id', component: MovieDetailsComponent },
    { path: 'tv-shows/:id', component: TvShowDetailsComponent },
    { path: 'watchlist', component: WatchlistComponent },
    { path: '**', redirectTo: '' }
];

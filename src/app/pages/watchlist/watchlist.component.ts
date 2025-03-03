import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieCardComponent } from "../../shared/components/movie-card/movie-card.component";
import { TvShowCardComponent } from "../../shared/components/tv-show-card/tv-show-card.component";
import { EmptyStateComponent } from "../../shared/components/empty-state/empty-state.component";

@Component({
  selector: 'app-watchlist',
  imports: [
    CommonModule,
    FormsModule,
    MovieCardComponent,
    TvShowCardComponent,
    EmptyStateComponent
],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss'
})
export class WatchlistComponent {

  watchlist: any[] = [];

  confirmRemoval(item: any) {
    const index = this.watchlist.indexOf(item);
    if (index !== -1) {
      this.watchlist.splice(index, 1);
    }
  }
}

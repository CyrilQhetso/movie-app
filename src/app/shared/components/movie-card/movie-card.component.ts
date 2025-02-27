import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../../../core/models/movie/movie.module';
import { TvShow } from '../../../core/models/tv-show/tv-show.module';
import { UtilityService } from '../../../core/services/utility.service';
import { WatchlistService } from '../../../core/services/watchlist.service';
import { NotificationService } from '../../../core/services/notification.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movie-card',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ]
})
export class MovieCardComponent implements OnInit{
  @Input() item!: Movie | TvShow;
  @Input() type: 'movie' | 'tv' = 'movie';
  @Output() viewDetails = new EventEmitter<number>();

  colorPalette: any;
  isInWatchlist = false;
  currentRating = 0;

  constructor(
    private utilityService: UtilityService,
    private watchlistService: WatchlistService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
      // Generate color palette base on item ID for variety
      this.colorPalette = this.utilityService.generateColorPalette(this.item.id);

      // check if item is in watchlist
      this.isInWatchlist = this.watchlistService.isInWatchlist(this.item.id, this.type);

      // Get current rating if in watchlist
      if (this.isInWatchlist) {
        const watchlistItem = this.watchlistService.getWatchlistItem(this.item.id, this.type);
        if (watchlistItem) {
          this.currentRating = watchlistItem.rating;
        }
      }
  }

  get title(): string {
    return this.type === 'movie' ? (this.item as Movie).title : (this.item as TvShow).name;
  }

  get releaseDate(): string {
    const dateString = this.type === 'movie' ? (this.item as Movie).release_date : (this.item as TvShow).first_air_date;
    return this.utilityService.formatDate(dateString);
  }

  get posterUrl(): string {
    return this.utilityService.getPosterUrl(this.item.poster_path);
  }

  get ratingColor(): string {
    return this.utilityService.getRatingColor(this.item.vote_avarage);
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.item.id);
  }

  toggleWatchlist(): void {
    if (this.isInWatchlist) {
      this.watchlistService.removeFromWatchlist(this.item.id, this.type);
      this.isInWatchlist = false;
      this.currentRating = 0;
      this.notificationService.info(`Removed ${this.title} from from wathclist`);
    } else {
      this.watchlistService.addToWatchlist({
        id: this.item.id,
        title: this.title,
        posterPath: this.item.poster_path,
        rating: 0,
        type: this.type,
        addedAt: new Date()
      });
      this.isInWatchlist = true;
      this.notificationService.success(`Added ${this.title} to watchlist`);
    }
  }

  updateRating(rating: number): void {
    // Add to watchlist if not already added
    if (!this.isInWatchlist) {
      this.watchlistService.addToWatchlist({
        id: this.item.id,
        title: this.title,
        posterPath: this.item.poster_path,
        rating: rating,
        type: this.type,
        addedAt: new Date()
      });
      this.isInWatchlist = true;
    } else {
      this.watchlistService.updateRating(this.item.id, this.type, rating);
    }

    this.currentRating = rating;
    this.notificationService.success(`Rated ${this.title} ${rating}/10`);
  }
}

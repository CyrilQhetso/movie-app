export interface WatchlistItem {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
  type: 'movie' | 'tv';
  addedAt: Date;
 }

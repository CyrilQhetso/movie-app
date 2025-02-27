import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WatchlistItem } from '../models/watchlist-item/watchlist-item.module';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private readonly STORAGE_KEY = 'tmdb_watchlist';
  private watchlistSubject = new BehaviorSubject<WatchlistItem[]>([]);
  public watchlist = this.watchlistSubject.asObservable();

  constructor() {
    this.loadWatchlist();
   }

   private loadWatchlist(): void {
    const storeWatchlist = localStorage.getItem(this.STORAGE_KEY);
    if (storeWatchlist) {
      try {
        const parseWatchlist = JSON.parse(storeWatchlist);
        // Convert stored data back to Date objects
        const watchlist = parseWatchlist.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }));
        this.watchlistSubject.next(watchlist);
      } catch (e) {
        console.error('Error pasring watchlist from localStorage', e);
        this.resetWatchlist();
      }
    } else {
      this.resetWatchlist();
    }
   }

   private saveWatchlist(watchlist:  WatchlistItem[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(watchlist));
    this.watchlistSubject.next(watchlist);
   }

   private resetWatchlist(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.watchlistSubject.next([]);
   }

   addToWatchlist(item: WatchlistItem): void {
    const currentWatchlist = this.watchlistSubject.value;
    // Check if item already exists
    if (!this.isInWatchlist(item.id, item.type)) {
      const updateWatchlist = [...currentWatchlist, { ...item, addedAt: new Date() }];
      this.saveWatchlist(updateWatchlist);
    }
   }

   removeFromWatchlist(id: number, type: 'movie' | 'tv'): void {
    const currentWatchlist = this.watchlistSubject.value;
    const updateWatchlist = currentWatchlist.filter(
      item => !(item.id === id && item.type === type)
    );
   }

   updateRating(id: number, type: 'movie' | 'tv', rating: number): void {
    const currentWatchlist = this.watchlistSubject.value;
    const updateWatchlist = currentWatchlist.map(item => {
      if (item.id === id && item.type === type) {
        return { ...item, rating };
      }
      return item;
    });
    this.saveWatchlist(updateWatchlist);
   }

   isInWatchlist(id: number, type: 'movie' | 'tv'): boolean {
    return this.watchlistSubject.value.some(
      item => item.id === id && item.type === type
    );
   }

   getWatchlistItem(id: number, type: 'movie' | 'tv'): WatchlistItem | undefined {
    return this.watchlistSubject.value.find(
      item => item.id === id && item.type === type
    );
   }
   
   clearWatchlist(): void {
    this.resetWatchlist();
   }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private ratings: { [id: number]: number } = {};

  setRating(id: number, rating: number): void {
    this.ratings[id] = rating;
  }

  getRating(id: number): number {
    return this.ratings[id] || 0;
  }
}

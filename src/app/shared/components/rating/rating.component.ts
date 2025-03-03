import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  imports: [
    CommonModule
  ],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {

  @Input() rating : number = 0;
  @Output() ratingChange =  new EventEmitter<number>();

  onRate(newRating: number) {
    this.rating =  newRating;
    this.ratingChange.emit(newRating);
  }
}

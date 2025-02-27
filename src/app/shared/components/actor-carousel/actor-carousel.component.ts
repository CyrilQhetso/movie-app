import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Actor } from '../../../core/models/actor/actor.module';
import { UtilityService } from '../../../core/services/utility.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-actor-carousel',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './actor-carousel.component.html',
  styleUrl: './actor-carousel.component.scss',
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('400ms ease-out', style({ opacity: 1,  transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class ActorCarouselComponent implements OnInit{
  @Input() actors: Actor[] = [];
  @Input() title = 'Cast';

  visibleActors: Actor[] = [];
  currentIndex = 0;
  itemsPerView = 5;

  constructor(public utilityService: UtilityService) {}

  ngOnInit(): void {
      this.updateVisibleActors();
      this.adjustItemsPerView();

      // Listen for window resize to adjust items per view
      window.addEventListener('resize', () => {
        this.adjustItemsPerView();
        this.updateVisibleActors();
      });
  }

  adjustItemsPerView(): void {
    const width = window.innerWidth;
    if (width < 600) {
      this.itemsPerView = 2;
    } else if (width < 960) {
      this.itemsPerView = 3;
    } else if (width < 1200) {
      this.itemsPerView = 4
    } else {
      this.itemsPerView = 5;
    }
  }

  updateVisibleActors(): void {
    if (!this.actors || this.actors.length === 0) {
      this.visibleActors = []
      return;
    }

    const end = Math.min(this.currentIndex + this.itemsPerView, this.actors.length);
    this.visibleActors = this.actors.slice(this.currentIndex - this.itemsPerView);
  }

  prevSlide(): void {
    this.currentIndex = Math.max(0, this.currentIndex - this.itemsPerView);
    this.updateVisibleActors();
  }

  nextSlide(): void {
    if (this.currentIndex + this.itemsPerView < this.actors.length) {
      this.currentIndex += this.itemsPerView;
      this.updateVisibleActors();
    }
  }

  canGoBack(): boolean {
    return this.currentIndex > 0;
  }

  canGoForward(): boolean {
    return this.currentIndex + this.itemsPerView < this.actors.length;
  }
}

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Genre } from '../../../core/models/genre/genre.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-genre-filter',
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule
  ],
  templateUrl: './genre-filter.component.html',
  styleUrl: './genre-filter.component.scss'
})
export class GenreFilterComponent implements OnInit, OnDestroy {
  @Input() genres: Genre[] = [];
  @Output() filterChange = new EventEmitter<number[]>();
  
  selectedGenres = new FormControl<number[]>([]);
  expanded = false;
  private destroy$ = new Subject<void>();
  
  ngOnInit(): void {
    this.selectedGenres.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(selected => {
        this.filterChange.emit(selected!);
      });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  toggleExpand(): void {
    this.expanded = !this.expanded;
  }
  
  clearFilters(): void {
    this.selectedGenres.setValue([]);
  }
  
  selectAll(): void {
    this.selectedGenres.setValue(this.genres.map(g => g.id));
  }
}

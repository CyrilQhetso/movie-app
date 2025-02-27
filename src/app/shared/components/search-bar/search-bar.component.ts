import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit, OnDestroy {
 @Output() search = new EventEmitter<string>();
 @Output() clear =  new EventEmitter<void>();

  searchControl = new FormControl('');
  searching =  false;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Listen to search input changes with debounce
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.searching = !!value && value.length > 0;
      if (this.searching) {
        this.search.emit(value as string);
      } else {
        this.clearSearch();
      }
    });
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

  clearSearch(): void {
    this.searchControl.setValue('', { emitEvent: false });
    this.searching = false;
    this.clear.emit();
  }
}

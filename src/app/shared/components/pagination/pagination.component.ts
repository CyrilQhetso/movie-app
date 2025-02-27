import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { flush } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pagination',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnChanges {
 @Input() currentPage = 1;
 @Input() totalPages = 1;
 @Input() visiblePages = 5;
 @Output() pageChange =  new EventEmitter<number>();

 pages: number[] = [];
 ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPages'] || changes['currentPage']) {
      this.generatedPageNumbers();
    }
  }

  generatedPageNumbers(): void {
    this.pages = [];

    if (this.totalPages <= this.visiblePages) {
      // Show all pages if total pages is less than visible pages
      for (let i = 1; i <= this.totalPages; i++) {
        this.pages.push(i);
      }
    } else {
      // Calculate which page to show
      let startPage = Math.max(1, this.currentPage = Math.floor(this.visiblePages / 2));
      let endPage = startPage + this.visiblePages - 1;

      if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = Math.max(1, endPage - this.visiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        this.pages.push(i);
      }
    }
  }

  changePage(page: number): void {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }
}

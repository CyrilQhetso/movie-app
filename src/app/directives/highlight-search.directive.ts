import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightSearch]'
})
export class HighlightSearchDirective implements OnChanges {
 @Input() searchItem: string = '';
  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
      if (!this.searchItem) {
        return;
      }

      const innerHTML = this.el.nativeElement.innerHTML;
      const regex = new RegExp(`${this.searchItem}`, 'gi');
      this.el.nativeElement.innerHTML = innerHTML.replace(regex, '<span class="highlight">$1</span>');
  }
}

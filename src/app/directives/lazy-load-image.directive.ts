import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appLazyLoadImage]'
})
export class LazyLoadImageDirective implements AfterViewInit{

  constructor(private el: ElementRef<HTMLImageElement>) { }

  ngAfterViewInit(): void {
      const img = this.el.nativeElement;
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            img.src = img.dataset['src'] || '';
            observer.unobserve(img);
          }
        });
      });
      observer.observe(img);
  }
}

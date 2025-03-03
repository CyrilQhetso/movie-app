import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
 private isDarkMode = false;

 toggleTheme(): void {
  this.isDarkMode = !this.isDarkMode;
  document.body.classList.toggle('dark-mode', this.isDarkMode);
 }

 get currentTheme(): string {
  return this.isDarkMode ? 'dark' : 'light';
 }
}

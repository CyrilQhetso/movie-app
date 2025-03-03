import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'movie-app';

  currentYear: number | undefined;

  constructor(private themeService: ThemeService) {
    this.currentYear = new Date().getFullYear();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}

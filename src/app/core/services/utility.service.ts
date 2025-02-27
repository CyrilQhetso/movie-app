import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  // Get poster image URL with specified size
  getPosterUrl(posterPath: string | null, size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w342'): string {
    if (!posterPath) {
      return 'assets/images/no-poster.png';
    }
    return `${environment.tmdbImageBaseUrl}/${size}${posterPath}`;
  }

  // Get backdrop image URL
  getBackdropUrl(backdropPath: string | null, size: 'w300' | 'w780' | 'w1280' | 'original' = 'w1280'): string {
    if (!backdropPath) {
      return 'assets/images/no-backdrop.png';
    }
    return `${environment.tmdbImageBaseUrl}/${size}${backdropPath}`;
  }

  // Get profile image URL for actors
  getProfileUrl(profilePath: string | null, size: 'w45' | 'w185' | 'h632' | 'original' = 'w185'): string {
    if (!profilePath) {
      return 'assets/images/no-profile.png';
    }
    return `${environment.tmdbImageBaseUrl}/${size}${profilePath}`;
  }

  // Format date in a user-friendly way
  formatDate(dateString: string): string {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Format runtime from minutes to hours and minutes
  formatRuntime(minutes: number): string {
    if (!minutes) return 'Unknown';
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours === 0) {
      return `${remainingMinutes}m`;
    }
    
    return `${hours}h ${remainingMinutes}m`;
  }

  // Generate a dynamic color based on rating
  getRatingColor(rating: number): string {
    if (rating >= 8) return '#4CAF50'; // Green for high ratings
    if (rating >= 6) return '#FFC107'; // Yellow for medium ratings
    if (rating >= 4) return '#FF9800'; // Orange for below average
    return '#F44336'; // Red for poor ratings
  }

  // Generate random color palette for UI variety
  generateColorPalette(seed: number): any {
    // Ensure seed is positive
    const positiveSeed = Math.abs(seed);
    
    // Generate main color using HSL for better control
    const hue = (positiveSeed * 137.5) % 360; // Using golden angle approximation
    
    return {
      primary: `hsl(${hue}, 70%, 50%)`,
      light: `hsl(${hue}, 60%, 80%)`,
      dark: `hsl(${hue}, 80%, 30%)`,
      accent: `hsl(${(hue + 180) % 360}, 70%, 50%)`,
      textColor: hue > 50 && hue < 190 ? '#000' : '#fff'
    };
  }
}

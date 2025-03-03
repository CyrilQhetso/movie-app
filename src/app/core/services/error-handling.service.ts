import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(private snackBar: MatSnackBar) { }

  handleError(error: any): void {
    console.error(error);
    this.snackBar.open('An error occured. Please try again.', 'Close', { duration: 3000});
  }
}

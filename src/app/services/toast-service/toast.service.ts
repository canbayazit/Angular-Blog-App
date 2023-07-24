import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  showError(message: any) {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Display duration in milliseconds (e.g., 5 seconds)
      panelClass: ['error-toast'], // Apply custom CSS class for styling
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }
  showSuccess(message: any) {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Display duration in milliseconds (e.g., 5 seconds)
      panelClass: ['success-toast'], // Apply custom CSS class for styling
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }
}

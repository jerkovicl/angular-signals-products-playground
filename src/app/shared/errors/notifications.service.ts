import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlerDialogComponent } from './error-handler-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly snackbar: MatSnackBar = inject(MatSnackBar);
  private readonly dialog: MatDialog = inject(MatDialog);
  // private readonly zone: NgZone = inject(NgZone);

  showClientError(message: string): void {
    // this.zone.run(() => {
    this.snackbar.open(`Error: ${message}`, 'Ok', {
      panelClass: ['error-snack'],
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
    // });
  }

  openServerErrorDialog(message: string) {
    // this.zone.run(() => {
    this.dialog.open(ErrorHandlerDialogComponent, {
      data: { message },
    });
    // });
  }

  showInfo(message: string, duration = 6000) {
    this.snackbar.open(message, 'Ok', {
      panelClass: ['non-error-snack'],
      duration,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }
}

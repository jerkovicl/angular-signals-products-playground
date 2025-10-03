import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error-handler-dialog',
  styleUrl: './error-handler-dialog.component.scss',
  templateUrl: './error-handler-dialog.component.html',
  imports: [MatIconModule, MatButtonModule, MatDialogModule],
})
export class ErrorHandlerDialogComponent {
  public title = 'Network Error';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public readonly data: any = inject(MAT_DIALOG_DATA);
}

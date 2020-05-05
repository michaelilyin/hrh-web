import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { ErrorNotificationInput, HttpError } from '@hrh/sdk/notifications/_models/notification-component.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDetailsDialogComponent } from '@hrh/sdk/notifications/error-details-dialog/error-details-dialog.component';
import { ErrorDetailsDialogInput } from '@hrh/sdk/notifications/error-details-dialog/error-details-dialog.model';

@Component({
  selector: 'hrh-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent implements OnInit {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) readonly data: ErrorNotificationInput,
    private readonly snackBarRef: MatSnackBarRef<ErrorComponent>,
    private readonly dialogService: MatDialog
  ) {}

  ngOnInit(): void {}

  handleDismissClick() {
    this.snackBarRef.dismiss();
  }

  handleDetailsClick() {
    this.dialogService.open<ErrorDetailsDialogComponent, ErrorDetailsDialogInput, void>(ErrorDetailsDialogComponent, {
      data: {
        error: this.data.error
      }
    });
    this.snackBarRef.dismiss();
  }

  get message(): string {
    if (this.data.error instanceof HttpError) {
      return 'Unexpected API error';
    }
    return 'Unexpected error';
  }
}

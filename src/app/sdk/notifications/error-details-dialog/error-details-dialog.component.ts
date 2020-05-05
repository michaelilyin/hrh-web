import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorDetailsDialogInput } from '@hrh/sdk/notifications/error-details-dialog/error-details-dialog.model';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '@hrh/sdk/notifications/_models/notification-component.model';

enum ErrorType {
  HTTP,
  EXCEPTION,
  UNKNOWN
}

@Component({
  selector: 'hrh-error-details-dialog',
  templateUrl: './error-details-dialog.component.html',
  styleUrls: ['./error-details-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorDetailsDialogComponent implements OnInit {
  readonly type: ErrorType;
  readonly ErrorType = ErrorType;

  constructor(@Inject(MAT_DIALOG_DATA) readonly data: ErrorDetailsDialogInput) {
    if (data.error instanceof HttpError) {
      this.type = ErrorType.HTTP;
    } else if (data.error instanceof Error) {
      this.type = ErrorType.EXCEPTION;
    } else {
      this.type = ErrorType.UNKNOWN;
    }
  }

  ngOnInit(): void {}
}

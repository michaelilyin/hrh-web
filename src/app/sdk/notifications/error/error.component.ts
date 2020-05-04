import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { ErrorNotificationInput } from '@hrh/sdk/notifications/_models/notification-component.model';

@Component({
  selector: 'hrh-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent implements OnInit {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) readonly data: ErrorNotificationInput,
    private snackBarRef: MatSnackBarRef<ErrorComponent>
  ) {}

  ngOnInit(): void {}

  handleDismissClick() {
    this.snackBarRef.dismiss();
  }

  handleDetailsClick() {}
}

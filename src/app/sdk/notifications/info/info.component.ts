import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { TextNotificationInput } from '@hrh/sdk/notifications/_models/notification-component.model';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'hrh-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoComponent implements OnInit {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) readonly data: TextNotificationInput,
    private snackBarRef: MatSnackBarRef<InfoComponent>
  ) {}

  ngOnInit(): void {}

  handleDismissClick() {
    this.snackBarRef.dismiss();
  }
}

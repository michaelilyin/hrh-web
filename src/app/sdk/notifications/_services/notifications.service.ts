import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsModule } from '@hrh/sdk/notifications/notifications.module';

@Injectable({
  providedIn: NotificationsModule
})
export class NotificationsService {
  constructor(private readonly snackBar: MatSnackBar) {}

  success(message: string) {
    this.snackBar.open(message, undefined, {
      verticalPosition: 'top',
      duration: 5000
    });
  }
}

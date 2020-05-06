import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsModule } from '@hrh/sdk/notifications/notifications.module';
import { InfoComponent } from '@hrh/sdk/notifications/info/info.component';
import {
  ErrorNotificationInput,
  KnownError,
  TextNotificationInput
} from '@hrh/sdk/notifications/_models/notification-component.model';
import { ErrorComponent } from '@hrh/sdk/notifications/error/error.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ObservableInput, ObservedValueOf, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: NotificationsModule
})
export class NotificationsService {
  constructor(private readonly snackBar: MatSnackBar) {}

  success(message: string) {
    this.snackBar.openFromComponent(InfoComponent, {
      verticalPosition: 'top',
      duration: 5000,
      data: {
        message
      } as TextNotificationInput
    });
  }

  error(error: KnownError) {
    console.error('Handled Error', error);

    const arg: KnownError = error instanceof HttpErrorResponse ? { request: undefined, response: error } : error;

    this.snackBar.openFromComponent(ErrorComponent, {
      verticalPosition: 'top',
      data: {
        error: arg
      } as ErrorNotificationInput
    });
  }

  handleError = (error: KnownError) => this.error(error);

  catchError<T, O extends ObservableInput<unknown>>(returnValue: () => O): OperatorFunction<T, T | ObservedValueOf<O>> {
    return catchError<T, O>((error: KnownError) => {
      this.error(error);
      return returnValue();
    });
  }
}

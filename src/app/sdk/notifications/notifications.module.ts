import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InfoComponent } from './info/info.component';
import { MessageModule } from '@hrh/message/message.module';
import { MatButtonModule } from '@angular/material/button';
import { ErrorComponent } from './error/error.component';
import { MatIconModule } from '@angular/material/icon';
import { ErrorDetailsDialogComponent } from './error-details-dialog/error-details-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SdkModule } from '@hrh/sdk/sdk.module';
import { LayoutModule } from '@hrh/sdk/layout/layout.module';
import { ExceptionDetailsComponent } from './error-details-dialog/exception-details/exception-details.component';
import { HttpErrorDetailsComponent } from './error-details-dialog/http-error-details/http-error-details.component';
import { GenericErrorDetailsComponent } from './error-details-dialog/generic-error-details/generic-error-details.component';

@NgModule({
  declarations: [
    InfoComponent,
    ErrorComponent,
    ErrorDetailsDialogComponent,
    ExceptionDetailsComponent,
    HttpErrorDetailsComponent,
    GenericErrorDetailsComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MessageModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    LayoutModule
  ]
})
export class NotificationsModule {}

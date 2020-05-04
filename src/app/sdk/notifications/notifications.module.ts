import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InfoComponent } from './info/info.component';
import { MessageModule } from '@hrh/message/message.module';
import { MatButtonModule } from '@angular/material/button';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [InfoComponent, ErrorComponent],
  imports: [CommonModule, MatSnackBarModule, MessageModule, MatButtonModule]
})
export class NotificationsModule {}

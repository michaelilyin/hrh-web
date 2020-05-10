import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitePersonDialog } from './invite-person/invite-person.dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { SdkModule } from '@hrh/sdk/sdk.module';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InvitePersonDialog],
  exports: [InvitePersonDialog],
  imports: [CommonModule, MatDialogModule, SdkModule, MatButtonModule, ReactiveFormsModule]
})
export class InvitationsModule {}

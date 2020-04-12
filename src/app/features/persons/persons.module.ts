import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailAvatarComponent } from './avatar/email-avatar/email-avatar.component';

@NgModule({
  declarations: [EmailAvatarComponent],
  exports: [EmailAvatarComponent],
  imports: [CommonModule]
})
export class PersonsModule {}

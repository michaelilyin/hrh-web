import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [MessageComponent],
  exports: [MessageComponent],
  imports: [CommonModule, MatCardModule]
})
export class MessageModule {}

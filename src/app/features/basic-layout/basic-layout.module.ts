import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TitleComponent],
  exports: [TitleComponent],
  imports: [CommonModule, RouterModule]
})
export class BasicLayoutModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { RouterModule } from '@angular/router';
import { ShellLayoutComponent } from './shell-layout/shell-layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgProgressModule } from 'ngx-progressbar';
import {
  ShellAfterTitleDirective,
  ShellAtTheEndDirective,
  ShellBeforeTitleDirective,
  ShellContentDirective
} from './shell-layout/shell-layout.directive';

@NgModule({
  declarations: [
    TitleComponent,
    ShellLayoutComponent,
    ShellBeforeTitleDirective,
    ShellAfterTitleDirective,
    ShellAtTheEndDirective,
    ShellContentDirective
  ],
  exports: [
    TitleComponent,
    ShellLayoutComponent,
    ShellBeforeTitleDirective,
    ShellAfterTitleDirective,
    ShellAtTheEndDirective,
    ShellContentDirective
  ],
  imports: [CommonModule, RouterModule, MatToolbarModule, NgProgressModule]
})
export class ShellSharedModule {}

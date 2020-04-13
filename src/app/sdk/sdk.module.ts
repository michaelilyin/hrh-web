import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyBrowserDirective } from './platform/only-browser.directive';
import { ColoredDialogHeaderDirective } from './layout/colored-dialog-header.directive';

@NgModule({
  declarations: [OnlyBrowserDirective, ColoredDialogHeaderDirective],
  exports: [OnlyBrowserDirective, ColoredDialogHeaderDirective],
  imports: [CommonModule]
})
export class SdkModule {}

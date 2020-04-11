import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyBrowserDirective } from './platform/only-browser.directive';

@NgModule({
  declarations: [OnlyBrowserDirective],
  exports: [OnlyBrowserDirective],
  imports: [CommonModule]
})
export class SdkModule {}

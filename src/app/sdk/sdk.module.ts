import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyBrowserDirective } from './platform/only-browser.directive';
import { CssOnlySpinnerComponent } from './platform/css-only-spinner/css-only-spinner.component';

@NgModule({
  declarations: [OnlyBrowserDirective, CssOnlySpinnerComponent],
  exports: [OnlyBrowserDirective],
  imports: [CommonModule]
})
export class SdkModule {}

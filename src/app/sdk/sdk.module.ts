import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyBrowserPlatformDirective } from './platform/only-browser-platform.directive';
import { ColoredDialogHeaderDirective } from './layout/colored-dialog-header/colored-dialog-header.directive';
import {
  OnlyHandsetDirective,
  OnlyTabletDirective,
  OnlyWebDirective
} from '@hrh/sdk/layout/adaptivity/breakpoint.directive';

@NgModule({
  declarations: [
    OnlyBrowserPlatformDirective,
    ColoredDialogHeaderDirective,
    OnlyHandsetDirective,
    OnlyTabletDirective,
    OnlyWebDirective
  ],
  exports: [
    OnlyBrowserPlatformDirective,
    ColoredDialogHeaderDirective,
    OnlyHandsetDirective,
    OnlyTabletDirective,
    OnlyWebDirective
  ],
  imports: [CommonModule]
})
export class SdkModule {}

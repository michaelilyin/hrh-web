import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColoredDialogHeaderDirective } from './colored-dialog-header/colored-dialog-header.directive';
import { OnlyHandsetDirective, OnlyTabletDirective, OnlyWebDirective } from './adaptivity/breakpoint.directive';
import { MatDialogActionsAlignDirective } from './dialog-actions/mat-dialog-actions-align.directive';

@NgModule({
  declarations: [
    ColoredDialogHeaderDirective,
    OnlyHandsetDirective,
    OnlyTabletDirective,
    OnlyWebDirective,
    MatDialogActionsAlignDirective
  ],
  exports: [ColoredDialogHeaderDirective, OnlyHandsetDirective, OnlyTabletDirective, OnlyWebDirective],
  imports: [CommonModule]
})
export class LayoutModule {}

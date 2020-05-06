import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColoredDialogHeaderDirective } from './colored-dialog-header/colored-dialog-header.directive';
import { OnlyHandsetDirective, OnlyTabletDirective, OnlyWebDirective } from './adaptivity/breakpoint.directive';
import { MatDialogActionsAlignDirective } from './dialog-actions/mat-dialog-actions-align.directive';
import { LoaderComponent } from './loader/loader.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    ColoredDialogHeaderDirective,
    OnlyHandsetDirective,
    OnlyTabletDirective,
    OnlyWebDirective,
    MatDialogActionsAlignDirective,
    LoaderComponent
  ],
  exports: [ColoredDialogHeaderDirective, OnlyHandsetDirective, OnlyTabletDirective, OnlyWebDirective, LoaderComponent],
  imports: [CommonModule, MatProgressBarModule]
})
export class LayoutModule {}

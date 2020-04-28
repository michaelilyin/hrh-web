import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyBrowserPlatformDirective } from './platform/only-browser-platform.directive';
import { ColoredDialogHeaderDirective } from './layout/colored-dialog-header/colored-dialog-header.directive';
import {
  OnlyHandsetDirective,
  OnlyTabletDirective,
  OnlyWebDirective
} from '@hrh/sdk/layout/adaptivity/breakpoint.directive';
import { LineSkeletonComponent } from './skeleton/line-skeleton.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CircleSkeletonComponent } from '@hrh/sdk/skeleton/circle-skeleton.component';
import { TextSkeletonComponent } from '@hrh/sdk/skeleton/text-skeleton.component';
import { FormsModule } from '@hrh/sdk/forms/forms.module';
import { NotificationsModule } from '@hrh/sdk/notifications/notifications.module';

@NgModule({
  declarations: [
    OnlyBrowserPlatformDirective,
    ColoredDialogHeaderDirective,
    OnlyHandsetDirective,
    OnlyTabletDirective,
    OnlyWebDirective,
    LineSkeletonComponent,
    CircleSkeletonComponent,
    TextSkeletonComponent
  ],
  exports: [
    FormsModule,
    NotificationsModule,
    OnlyBrowserPlatformDirective,
    ColoredDialogHeaderDirective,
    OnlyHandsetDirective,
    OnlyTabletDirective,
    OnlyWebDirective,
    LineSkeletonComponent,
    CircleSkeletonComponent,
    TextSkeletonComponent
  ],
  imports: [CommonModule, NgxSkeletonLoaderModule]
})
export class SdkModule {}

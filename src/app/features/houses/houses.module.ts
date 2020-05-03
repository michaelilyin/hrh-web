import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseCardComponent } from './house-card/house-card.component';
import { MatCardModule } from '@angular/material/card';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SdkModule } from '@hrh/sdk/sdk.module';
import { MatIconModule } from '@angular/material/icon';
import { HouseCardPlaceholderComponent } from './house-card-placeholder/house-card-placeholder.component';
import { HouseDeleteConfirmDialogComponent } from '@hrh/houses/house-delete-confirm-dialog/house-delete-confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MessageModule } from '../message/message.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HouseCardComponent, HouseCardPlaceholderComponent, HouseDeleteConfirmDialogComponent],
  exports: [HouseCardComponent, HouseCardPlaceholderComponent],
  imports: [
    CommonModule,
    MatCardModule,
    NgxSkeletonLoaderModule,
    SdkModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MessageModule,
    ReactiveFormsModule
  ]
})
export class HousesModule {}

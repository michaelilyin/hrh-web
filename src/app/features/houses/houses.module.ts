import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseCardComponent } from './house-card/house-card.component';
import { MatCardModule } from '@angular/material/card';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SdkModule } from '@hrh/sdk/sdk.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HouseCardComponent],
  exports: [HouseCardComponent],
  imports: [CommonModule, MatCardModule, NgxSkeletonLoaderModule, SdkModule, MatIconModule]
})
export class HousesModule {}

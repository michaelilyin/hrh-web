import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HousePagesRoutingModule } from './house-pages-routing.module';
import { NewHouseComponent } from './pages/new-house/new-house.component';
import { SdkModule } from '@hrh/sdk/sdk.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [NewHouseComponent],
  imports: [CommonModule, HousePagesRoutingModule, SdkModule, ReactiveFormsModule, MatButtonModule, MatCardModule]
})
export class HousePagesModule {}

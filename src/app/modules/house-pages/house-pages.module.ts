import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HousePagesRoutingModule } from './house-pages-routing.module';
import { NewHouseComponent } from './pages/new-house/new-house.component';
import { SdkModule } from '@hrh/sdk/sdk.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HouseShellComponent } from './pages/house-shell/house-shell.component';
import { SideMenuModule } from '@hrh/side-menu/side-menu.module';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { HouseDashboardComponent } from './pages/house-dashboard/house-dashboard.component';
import { HouseSettingsComponent } from './pages/house-settings/house-settings.component';

@NgModule({
  declarations: [NewHouseComponent, HouseShellComponent, HouseDashboardComponent, HouseSettingsComponent],
  imports: [
    CommonModule,
    HousePagesRoutingModule,
    SdkModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    SideMenuModule,
    MatListModule,
    MatIconModule
  ]
})
export class HousePagesModule {}

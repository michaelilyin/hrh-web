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
import { MatDialogModule } from '@angular/material/dialog';
import { HouseSettingsAdministrativePage } from './pages/house-settings-administrative/house-settings-administrative.page';
import { HouseSettingsMembersPage } from './pages/house-settings-members/house-settings-members.page';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    NewHouseComponent,
    HouseShellComponent,
    HouseDashboardComponent,
    HouseSettingsComponent,
    HouseSettingsAdministrativePage,
    HouseSettingsMembersPage
  ],
  imports: [
    CommonModule,
    HousePagesRoutingModule,
    SdkModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    SideMenuModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule
  ]
})
export class HousePagesModule {}

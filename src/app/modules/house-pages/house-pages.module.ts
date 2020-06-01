import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HousePagesRoutingModule } from './house-pages-routing.module';
import { NewHouseComponent } from './pages/new-house/new-house.component';
import { SdkModule } from '@hrh/sdk/sdk.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { HouseSettingsInvitationsPage } from './pages/house-settings-invitations/house-settings-invitations.page';
import { MatToolbarModule } from '@angular/material/toolbar';
import { InvitationsModule } from '@hrh/invitations/invitations.module';
import { DataModule } from '@hrh/sdk/data/data.module';
import { TableModule } from '@hrh/sdk/table/table.module';
import { FormsModule as HrhFormsModule } from '@hrh/sdk/forms/forms.module';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    NewHouseComponent,
    HouseShellComponent,
    HouseDashboardComponent,
    HouseSettingsComponent,
    HouseSettingsAdministrativePage,
    HouseSettingsMembersPage,
    HouseSettingsInvitationsPage
  ],
  imports: [
    CommonModule,
    HousePagesRoutingModule,
    SdkModule,
    HrhFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    SideMenuModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    MatToolbarModule,
    InvitationsModule,
    DataModule,
    TableModule,
    MatSortModule
  ]
})
export class HousePagesModule {}

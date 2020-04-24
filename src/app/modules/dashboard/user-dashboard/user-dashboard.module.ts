import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserHousesComponent } from './user-houses/user-houses.component';
import { HousesModule } from '@hrh/houses/houses.module';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [UserDashboardComponent, UserHousesComponent],
  imports: [CommonModule, UserDashboardRoutingModule, HousesModule, MatRippleModule, MatCardModule]
})
export class UserDashboardModule {}

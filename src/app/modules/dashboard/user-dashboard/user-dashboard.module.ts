import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserHousesComponent } from './user-houses/user-houses.component';

@NgModule({
  declarations: [UserDashboardComponent, UserHousesComponent],
  imports: [CommonModule, UserDashboardRoutingModule]
})
export class UserDashboardModule {}

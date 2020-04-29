import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CurrentHousesCountResolver } from '@hrh/houses/_resolver/current-houses-count.resolver';

const routes: Routes = [
  {
    path: '',
    component: UserDashboardComponent,
    resolve: {
      [CurrentHousesCountResolver.field]: CurrentHousesCountResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRoutingModule {}

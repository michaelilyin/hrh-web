import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewHouseComponent } from './pages/new-house/new-house.component';
import { HouseDashboardComponent } from './pages/house-dashboard/house-dashboard.component';
import { HouseInfoResolver } from '@hrh/houses/_resolver/house-info.resolver';

const routes: Routes = [
  {
    path: 'new',
    component: NewHouseComponent
  },
  {
    path: ':houseId',
    component: HouseDashboardComponent,
    resolve: {
      [HouseInfoResolver.field]: HouseInfoResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HousePagesRoutingModule {}

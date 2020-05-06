import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewHouseComponent } from './pages/new-house/new-house.component';
import { HouseShellComponent } from './pages/house-shell/house-shell.component';
import { HouseInfoResolver } from '@hrh/houses/_resolver/house-info.resolver';
import { HouseDashboardComponent } from './pages/house-dashboard/house-dashboard.component';
import { HouseSettingsComponent } from './pages/house-settings/house-settings.component';
import { HouseSettingsAdministrativePage } from './pages/house-settings-administrative/house-settings-administrative.page';
import { HouseSettingsMembersPage } from './pages/house-settings-members/house-settings-members.page';

const routes: Routes = [
  {
    path: 'new',
    component: NewHouseComponent
  },
  {
    path: ':houseId',
    component: HouseShellComponent,
    resolve: {
      [HouseInfoResolver.field]: HouseInfoResolver
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview'
      },
      {
        path: 'overview',
        component: HouseDashboardComponent
      },
      {
        path: 'settings',
        component: HouseSettingsComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'administrative'
          },
          {
            path: 'administrative',
            component: HouseSettingsAdministrativePage
          },
          {
            path: 'members',
            component: HouseSettingsMembersPage
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HousePagesRoutingModule {}

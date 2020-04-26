import { NgModule } from '@angular/core';
import { ShellComponent } from './shell/shell.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from '@hrh/auth/authenticated.guard';
import { AnonymousDashboardGuard } from './dashboard/dashboard-selection-guard.service';
import { UserDashboardGuard } from './dashboard/user-dashboard-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('src/app/modules/dashboard/anonymous-dashboard/anonymous-dashboard.module').then(
            (m) => m.AnonymousDashboardModule
          ),
        canActivate: [AnonymousDashboardGuard],
        canActivateChild: [AnonymousDashboardGuard],
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'overview',
        loadChildren: () =>
          import('src/app/modules/dashboard/user-dashboard/user-dashboard.module').then((m) => m.UserDashboardModule),
        canActivate: [UserDashboardGuard],
        canActivateChild: [UserDashboardGuard],
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'administration'
      },
      {
        path: 'shopping',
        canActivate: [AuthenticatedGuard],
        canActivateChild: [AuthenticatedGuard],
        loadChildren: () =>
          import('src/app/modules/shopping-pages/shopping-pages-routing.module').then(
            (m) => m.ShoppingPagesRoutingModule
          )
      },
      {
        path: 'profile',
        canActivate: [AuthenticatedGuard],
        canActivateChild: [AuthenticatedGuard],
        loadChildren: () =>
          import('src/app/modules/profile-pages/profile-pages.module').then((m) => m.ProfilePagesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule {}

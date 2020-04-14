import { NgModule } from '@angular/core';
import { ShellComponent } from './shell/shell.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from '@hrh/auth/authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'shopping',
        canActivate: [AuthenticatedGuard],
        canActivateChild: [AuthenticatedGuard],
        loadChildren: () =>
          import('src/app/modules/shopping-pages/shopping-pages-routing.module').then(
            (m) => m.ShoppingPagesRoutingModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth-pages/auth-pages.module').then((m) => m.AuthPagesModule)
  },
  {
    path: '',
    loadChildren: () => import('./shell/shell.module').then((m) => m.ShellModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

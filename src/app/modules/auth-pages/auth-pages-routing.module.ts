import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginResultPageComponent } from './pages/login-result-page/login-result-page.component';
import { LogoutPageComponent } from './pages/logout-page/logout-page.component';
import { LogoutResultPageComponent } from './pages/logout-result-page/logout-result-page.component';
import { SsrAuthNoticeComponent } from '@hrh/pages/auth-pages/pages/ssr-auth-notice/ssr-auth-notice.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'login/result',
    component: LoginResultPageComponent
  },
  {
    path: 'logout',
    component: LogoutPageComponent
  },
  {
    path: 'logout/result',
    component: LogoutResultPageComponent
  },
  {
    path: 'ssr',
    component: SsrAuthNoticeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthPagesRoutingModule {}

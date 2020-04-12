import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthPagesRoutingModule } from './auth-pages-routing.module';
import { LoginResultPageComponent } from './pages/login-result-page/login-result-page.component';
import { LogoutPageComponent } from './pages/logout-page/logout-page.component';
import { LogoutResultPageComponent } from './pages/logout-result-page/logout-result-page.component';
import { SsrProtectionPageComponent } from './pages/ssr-protection-page/ssr-protection-page.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    LoginResultPageComponent,
    LogoutPageComponent,
    LogoutResultPageComponent,
    SsrProtectionPageComponent
  ],
  imports: [CommonModule, AuthPagesRoutingModule]
})
export class AuthPagesModule {}

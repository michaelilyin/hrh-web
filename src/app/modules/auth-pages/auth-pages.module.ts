import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthPagesRoutingModule } from './auth-pages-routing.module';
import { LoginResultPageComponent } from './pages/login-result-page/login-result-page.component';
import { LogoutPageComponent } from './pages/logout-page/logout-page.component';
import { LogoutResultPageComponent } from './pages/logout-result-page/logout-result-page.component';
import { SsrProtectionPageComponent } from './pages/ssr-protection-page/ssr-protection-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { SdkModule } from '@hrh/sdk/sdk.module';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AUTH_DELAY } from './models/config.model';
import { ShellSharedModule } from '@hrh/shell/shell-shared.module';

@NgModule({
  declarations: [
    LoginPageComponent,
    LoginResultPageComponent,
    LogoutPageComponent,
    LogoutResultPageComponent,
    SsrProtectionPageComponent
  ],
  imports: [
    CommonModule,
    AuthPagesRoutingModule,
    MatToolbarModule,
    ShellSharedModule,
    MatCardModule,
    SdkModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: AUTH_DELAY,
      useValue: 2
    }
  ]
})
export class AuthPagesModule {}

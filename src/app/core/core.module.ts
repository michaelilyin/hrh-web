import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ENVIRONMENT_INITIALIZER } from './environment/environment.service';
import { API_INTERCEPTOR } from './api/api.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { AUTH_INITIALIZER, OAUTH_STORAGE } from './auth/auth.initializer';
import { OAuthModule } from 'angular-oauth2-oidc';
import { RouterModule } from '@angular/router';
import { OnlyAuthenticatedDirective } from './auth/only-authenticated.directive';

@NgModule({
  declarations: [OnlyAuthenticatedDirective],
  imports: [CommonModule, HttpClientModule, OAuthModule.forRoot(), RouterModule],
  exports: [OnlyAuthenticatedDirective],
  providers: [ENVIRONMENT_INITIALIZER, AUTH_INITIALIZER, API_INTERCEPTOR, OAUTH_STORAGE]
})
export class CoreModule {}

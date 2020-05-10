import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ENVIRONMENT_INITIALIZER } from '@hrh/env/environment.service';
import { API_INTERCEPTOR } from './api/api.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { AUTH_INITIALIZER, OAUTH_STORAGE } from '@hrh/auth/auth.initializer';
import { OAuthModule } from 'angular-oauth2-oidc';
import { RouterModule } from '@angular/router';
import { AUTH_INTERCEPTOR } from './api/auth.interceptor';
import { NotificationsModule } from '@hrh/sdk/notifications/notifications.module';
import { HTTP_ERROR_INTERCEPTOR } from './api/http-error.interceptor';

const INTERCEPTORS = [API_INTERCEPTOR, AUTH_INTERCEPTOR, HTTP_ERROR_INTERCEPTOR];

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, OAuthModule.forRoot(), RouterModule, NotificationsModule],
  providers: [ENVIRONMENT_INITIALIZER, AUTH_INITIALIZER, OAUTH_STORAGE, ...INTERCEPTORS]
})
export class CoreModule {}

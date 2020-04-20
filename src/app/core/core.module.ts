import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ENVIRONMENT_INITIALIZER } from '@hrh/env/environment.service';
import { API_INTERCEPTOR } from './api/api.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { AUTH_INITIALIZER, OAUTH_STORAGE } from '@hrh/auth/auth.initializer';
import { OAuthModule } from 'angular-oauth2-oidc';
import { RouterModule } from '@angular/router';
import { AUTH_INTERCEPTOR } from './api/auth.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, OAuthModule.forRoot(), RouterModule],
  providers: [ENVIRONMENT_INITIALIZER, AUTH_INITIALIZER, API_INTERCEPTOR, AUTH_INTERCEPTOR, OAUTH_STORAGE]
})
export class CoreModule {}

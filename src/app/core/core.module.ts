import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ENVIRONMENT_INITIALIZER } from './services/environment.service';
import { API_INTERCEPTOR } from './interceptors/api.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { AUTH_INITIALIZER } from './auth/auth.initializer';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, OAuthModule.forRoot()],
  providers: [ENVIRONMENT_INITIALIZER, AUTH_INITIALIZER, API_INTERCEPTOR]
})
export class CoreModule {}

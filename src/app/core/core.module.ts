import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ENVIRONMENT_INITIALIZER } from './environment/environment.service';
import { API_INTERCEPTOR } from './api/api.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { AUTH_INITIALIZER } from './auth/auth.initializer';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, OAuthModule.forRoot()],
  providers: [
    ENVIRONMENT_INITIALIZER,
    AUTH_INITIALIZER,
    API_INTERCEPTOR,
    { provide: OAuthStorage, useValue: localStorage }
  ]
})
export class CoreModule {}

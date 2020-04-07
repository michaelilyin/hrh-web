import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ENVIRONMENT_INITIALIZER} from './services/environment.service';
import {API_INTERCEPTOR} from './interceptors/api.interceptor';
import {HttpClientModule} from '@angular/common/http';
import {KEYCLOAK_INITIALIZER} from './auth/keycloak.initializer';
import {KeycloakAngularModule} from 'keycloak-angular';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [
    ENVIRONMENT_INITIALIZER,
    KEYCLOAK_INITIALIZER,

    API_INTERCEPTOR
  ]
})
export class CoreModule {
}

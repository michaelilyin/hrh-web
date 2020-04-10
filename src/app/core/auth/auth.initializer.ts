import { APP_INITIALIZER, Provider } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Platform } from '@angular/cdk/platform';
import { EnvironmentService } from '../services/environment.service';
import { first, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Environment } from '../models/environment.model';

export function authInitializer(
  envService: EnvironmentService,
  oauth: OAuthService,
  platform: Platform
): () => Promise<Environment> {
  return () => {
    return envService.environment$
      .pipe(
        first(),
        tap((env) => {
          oauth.configure({
            clientId: 'hrh-web-dev',
            issuer: env.auth.path,
            redirectUri: env.auth.loginRedirect,
            responseType: 'code',
            scope: 'openid profile email',
            showDebugInformation: true,
            disableAtHashCheck: true,
            clearHashAfterLogin: true
          });
        })
      )
      .toPromise();
  };
}

export const AUTH_INITIALIZER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: authInitializer,
  multi: true,
  deps: [EnvironmentService, OAuthService, Platform]
};

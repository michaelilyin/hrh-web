import {APP_INITIALIZER, Provider} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {Platform} from '@angular/cdk/platform';
import {EnvironmentService} from '../services/environment.service';
import {first, map, switchMap} from 'rxjs/operators';

export function authInitializer(env: EnvironmentService, oauth: OAuthService, platform: Platform): () => Promise<any> {
  return () => {
    return env.environment$.pipe(
      first(),
      switchMap(env => {
        oauth.configure({
          clientId: 'hrh-web-dev',
          issuer: env.auth.path,
          redirectUri: env.auth.loginRedirect,
          responseType: 'code',
          scope: 'openid profile email',
          showDebugInformation: true,
          disableAtHashCheck: true
        });
        return oauth.loadDiscoveryDocumentAndTryLogin();
      })
    ).toPromise();
  };
}

export const AUTH_INITIALIZER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: authInitializer,
  multi: true,
  deps: [
    EnvironmentService,
    OAuthService,
    Platform
  ]
};

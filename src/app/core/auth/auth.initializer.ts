import {APP_INITIALIZER, Provider} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {Platform} from '@angular/cdk/platform';

export function authInitializer(oauth: OAuthService, platform: Platform): () => Promise<any> {
  return (): Promise<any> => new Promise<void>((resolve, reject) => {
    try {
      if (!platform.isBrowser) {
        resolve();
      }
      oauth.configure({
        clientId: 'hrh-web-dev',
        issuer: 'https://auth.michaelilyin.ru/auth/realms/kiss-cloud',
        redirectUri: window.location.origin,
        responseType: 'code',
        scope: 'openid profile email',
        showDebugInformation: true,
      });
      oauth.loadDiscoveryDocumentAndTryLogin()
      .then(() => resolve())
      .catch((e) => reject(e));
      resolve();
    } catch (e) {
      reject(e);
    }
    // oauth.init({
    //   config: {
    //     realm: 'kiss-cloud',
    //     url: 'https://auth.michaelilyin.ru/auth/',
    //     clientId: 'hrh-web-dev',
    //   },
    //   // initOptions: {
    //   //   onLoad: 'check-sso'
    //   // }
  });
}

export const AUTH_INITIALIZER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: authInitializer,
  multi: true,
  deps: [
    OAuthService,
    Platform
  ]
};

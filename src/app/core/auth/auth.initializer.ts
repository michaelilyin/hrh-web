import {APP_INITIALIZER, Inject, Optional, Provider} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import {Request} from 'express';

export function authInitializer(oauth: OAuthService, request?: Request): () => Promise<any> {
  function getHost(): string {
    if (request !== undefined && request !== null) {
      return `${request.protocol}://${request.get('host')}`;
    }
    return window.location.origin;
  }
  return (): Promise<any> => new Promise<void>((resolve, reject) => {
    try {
      oauth.configure({
        clientId: 'hrh-web-dev',
        issuer: 'https://auth.michaelilyin.ru/auth/realms/kiss-cloud',
        redirectUri: getHost(),
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
    [new Optional(), new Inject(REQUEST), Request]
  ]
};

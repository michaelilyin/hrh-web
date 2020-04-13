import { APP_INITIALIZER, Provider } from '@angular/core';
import { EnvironmentService } from '@hrh/core/environment/environment.service';
import { first, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Platform } from '@angular/cdk/platform';
import { OAuthStorage } from 'angular-oauth2-oidc';

export function authInitializer(envService: EnvironmentService, authService: AuthService): () => Promise<void> {
  return () => {
    return envService.environment$
      .pipe(
        first(),
        switchMap((env) => authService.init(env))
      )
      .toPromise();
  };
}

export const AUTH_INITIALIZER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: authInitializer,
  multi: true,
  deps: [EnvironmentService, AuthService]
};

export function storageFactory(platform: Platform): OAuthStorage {
  if (platform.isBrowser) {
    return localStorage;
  }
  return {
    getItem(key: string): string | null {
      return null;
    },
    removeItem(key: string): void {},
    setItem(key: string, data: string): void {}
  };
}

export const OAUTH_STORAGE: Provider = {
  provide: OAuthStorage,
  useFactory: storageFactory,
  deps: [Platform]
};

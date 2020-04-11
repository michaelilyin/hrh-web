import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { Authentication } from './auth.model';
import { filter, map, shareReplay } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';
import { Platform } from '@angular/cdk/platform';
import { Environment } from '../environment/environment.model';

interface OAuthProfile {
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _auth$ = new BehaviorSubject<Authentication>({
    authenticated: false
  });

  public auth$ = this._auth$.pipe(shareReplay(1));

  constructor(private readonly oAuthService: OAuthService, private readonly platform: Platform) {}

  init(env: Environment): Promise<void> {
    if (!this.platform.isBrowser) {
      return Promise.resolve();
    }

    this.oAuthService.configure({
      clientId: env.auth.clientId,
      issuer: env.auth.path,
      redirectUri: `${env.auth.loginRedirectHost}/auth/login/result`,
      postLogoutRedirectUri: `${env.auth.loginRedirectHost}/auth/logout/result`,
      responseType: 'code',
      scope: 'openid profile email',
      showDebugInformation: true,
      disableAtHashCheck: true,
      clearHashAfterLogin: true
    });

    this.initReloadProfileOnNewToken();

    return this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oAuthService.hasValidAccessToken()) {
        return this.loadProfile().then((auth) => this._auth$.next(auth));
      }
    });
  }

  public login() {
    const login = window.open(
      `${window.location.origin}/auth/login`,
      'Log In',
      'menubar=no,toolbar=no,location=no,status=no'
    );
  }

  public logout() {
    const logout = window.open(
      `${window.location.origin}/auth/logout`,
      'Log Out',
      'menubar=no,toolbar=no,location=no,status=no'
    );
  }

  private initReloadProfileOnNewToken() {
    fromEvent(window, 'storage')
      .pipe(
        filter((event) => event.type === 'storage'),
        map((event) => event as StorageEvent),
        filter((event) => event.key === 'access_token')
      )
      .subscribe((event: StorageEvent) => {
        if (event.newValue != undefined) {
          return this.loadProfile().then((auth) => this._auth$.next(auth));
        }
        this._auth$.next({
          authenticated: false
        });
      });
  }

  private loadProfile(): Promise<Authentication> {
    return this.oAuthService.loadUserProfile().then((profileObj) => {
      const profile = profileObj as OAuthProfile;
      const auth: Authentication = {
        authenticated: true,
        email: profile.email as string,
        username: profile.preferred_username as string,
        firstName: profile.given_name as string,
        lastName: profile.family_name as string
      };
      return auth;
    });
  }
}

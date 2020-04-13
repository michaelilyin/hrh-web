import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { first, map } from 'rxjs/operators';
import { Platform } from '@angular/cdk/platform';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly authService: AuthService,
    private readonly platform: Platform,
    private readonly router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthAndRedirect.call(this);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthAndRedirect.call(this);
  }

  checkAuthAndRedirect(): Observable<boolean | UrlTree> {
    return this.authService.auth$.pipe(
      first(),
      map((auth) => {
        if (auth.authenticated) {
          return true;
        }
        if (this.platform.isBrowser) {
          // TODO: redirect to auth page with backward redirect
          return this.router.createUrlTree(['/']);
        }

        return this.router.createUrlTree(['auth', 'ssr-protection']);
      })
    );
  }
}

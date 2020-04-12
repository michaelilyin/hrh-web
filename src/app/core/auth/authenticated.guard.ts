import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@hrh/core/auth/auth.service';
import { first, map } from 'rxjs/operators';
import { Platform } from '@angular/cdk/platform';
import { AuthShellComponent } from '@hrh/core/auth/auth-shell/auth-shell.component';

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
    if (next.component !== AuthShellComponent) {
      throw Error('Only Auth Shell allowed as target component');
    }
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
          return this.router.createUrlTree(['/']);
        }
        // For SSR return true and disable view in AuthShell component
        return true;
      })
    );
  }
}

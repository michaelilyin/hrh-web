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
import { AuthService } from '@hrh/auth/auth.service';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnonymousDashboardGuard implements CanActivate, CanActivateChild {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.selectDashboard();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.selectDashboard();
  }

  private selectDashboard() {
    return this.authService.auth$.pipe(
      first(),
      map((auth) => {
        if (!auth.authenticated) {
          return true;
        }
        return this.router.createUrlTree(['/overview']);
      })
    );
  }
}

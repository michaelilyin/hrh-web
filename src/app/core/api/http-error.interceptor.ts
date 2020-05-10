import { Injectable, Provider } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { interval, Observable, throwError } from 'rxjs';
import { catchError, first, switchMap } from 'rxjs/operators';
import { DemoError, HttpError } from '@hrh/sdk/notifications/_models/notification-component.model';
import { AuthService } from '@hrh/auth/auth.service';
import { GlobalRoles } from '@hrh/auth/global.roles';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 403) {
            return this.handleForbidden(error);
          }
          return throwError(new HttpError(request, error));
        }
        return throwError(error);
      })
    );
  }

  private handleForbidden(error: HttpErrorResponse): Observable<HttpEvent<unknown>> {
    return this.authService.auth$.pipe(
      first(),
      switchMap((auth) => {
        if (auth.authenticated && auth.hasRole(GlobalRoles.demo)) {
          return interval(1000).pipe(
            first(),
            switchMap(() => {
              return throwError(new DemoError('Demo accounts can not modify any data, operation stopped'));
            })
          );
        }
        return throwError(error);
      })
    );
  }
}

export const HTTP_ERROR_INTERCEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorInterceptor,
  multi: true
};

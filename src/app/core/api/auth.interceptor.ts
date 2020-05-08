import { Injectable, Provider } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthEvent, OAuthResourceServerErrorHandler, OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshing$?: Observable<OAuthEvent>;

  constructor(
    private readonly authService: OAuthService,
    private readonly errorHandler: OAuthResourceServerErrorHandler
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('v1/')) {
      if (this.authService.hasValidAccessToken()) {
        return this.doAuthenticatedRequest(request, next);
      }

      console.log('Has no valid token, check refreshing');
      if (this.refreshing$ == undefined) {
        console.log('Has no active silent refresh, perform new one');
        this.refreshing$ = fromPromise(
          this.authService.silentRefresh().then((res) => {
            console.log('Silent refresh event', res);
            this.refreshing$ = undefined;
            return res;
          })
        );
      }

      return this.refreshing$.pipe(
        tap((_) => console.log('Token refreshed, repeat request')),
        switchMap(() => this.doAuthenticatedRequest(request, next))
      );
    }
    return next
      .handle(request)
      .pipe(catchError((error: HttpResponse<unknown>) => this.errorHandler.handleError(error)));
  }

  private doAuthenticatedRequest(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getAccessToken();
    const header = `Bearer ${token}`;

    return next
      .handle(
        request.clone({
          setHeaders: {
            Authorization: header
          }
        })
      )
      .pipe(catchError((error: HttpResponse<unknown>) => this.errorHandler.handleError(error)));
  }
}

export const AUTH_INTERCEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};

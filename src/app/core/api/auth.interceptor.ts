import { Injectable, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthResourceServerErrorHandler, OAuthStorage } from 'angular-oauth2-oidc';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly authStorage: OAuthStorage,
    private readonly errorHandler: OAuthResourceServerErrorHandler
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('v1/')) {
      const token = this.authStorage.getItem('access_token');
      const header = `Bearer ${token}`;

      return next
        .handle(
          request.clone({
            setHeaders: {
              Authorization: header
            }
          })
        )
        .pipe(catchError((error) => this.errorHandler.handleError(error)));
    }
    return next.handle(request).pipe(catchError((error) => this.errorHandler.handleError(error)));
  }
}

export const AUTH_INTERCEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};

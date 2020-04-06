import {Inject, Injectable, isDevMode, Optional, Provider} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import {Request} from 'express';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(@Optional() @Inject(REQUEST) protected request?: Request) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.warn(request.url);
    if (this.request != undefined) {
      const host = `${this.request.protocol}://${this.request.get('host')}`;
      const slash = request.url.startsWith('/') === true ? '' : '/';
      const newUrl = `${host}${slash}${request.url}`;
      const newReq = request.clone({url: newUrl});

      return next.handle(newReq);
    }
    return next.handle(request);
  }
}

export const API_INTERCEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ApiInterceptor,
  multi: true
};

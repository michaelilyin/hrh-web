import {Inject, Injectable, Optional, Provider} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS, HttpEventType
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import {Request} from 'express';
import {EnvironmentService} from '../services/environment.service';
import {finalize, first, switchMap, tap} from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private readonly environmentService: EnvironmentService,
    @Optional() @Inject(REQUEST) private readonly request?: Request,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith('/v1') || request.url.startsWith('v1')) {
      return this.environmentService.environment$.pipe(
        first(),
        switchMap(env => {
          const newUrl = this.concatUrl(env.api, request.url);
          return next.handle(request.clone({
            url: newUrl
          }));
        })
      );
    }

    if (this.request !== undefined && this.request !== null) {
      const newUrl = this.concatUrl(this.request.get('host'), request.url);
      return next.handle(request.clone({url: newUrl}));
    }

    return next.handle(request);
  }

  get protocol(): string {
    if (this.request !== undefined && this.request !== null) {
      return `${this.request.protocol}://`;
    }
    return `${window.location.protocol}://`;
  }

  concatUrl(host: string, path: string): string {
    if (path.startsWith('/')) {
      return `${this.protocol}${host}${path}`;
    }
    return `${this.protocol}${host}/${path}`;
  }
}

export const API_INTERCEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ApiInterceptor,
  multi: true
};

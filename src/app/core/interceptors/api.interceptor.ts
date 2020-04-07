import {Inject, Injectable, Optional, Provider} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import {Request} from 'express';
import {EnvironmentService} from '../services/environment.service';
import {first, switchMap, tap} from 'rxjs/operators';

function concatUrl(host: string, path: string): string {
  if (path.startsWith('/')) {
    return `${host}${path}`;
  }
  return `${host}/${path}`;
}

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private readonly environmentService: EnvironmentService,
    @Optional() @Inject(REQUEST) private readonly request?: Request,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.warn(request.url);
    if (request.url.startsWith('/v1') || request.url.startsWith('v1')) {
      return this.environmentService.environment$.pipe(
        first(),
        switchMap(env => {
          console.warn(env);
          const newUrl = concatUrl(`https://${env.api}`, request.url);
          return next.handle(request.clone({
            url: newUrl
          })).pipe(
            tap(response => console.warn('resp', response.type), error => console.warn('error', error))
          );
        })
      );
    }
    console.warn('render', request.url);
    if (this.request !== undefined && this.request !== null) {
      const host = `${this.request.protocol}://${this.request.get('host')}`;
      const newUrl = concatUrl(host, request.url);

      console.warn('handle render', newUrl);
      return next.handle(request.clone({url: newUrl}));
    }

    console.warn('handle default', request.url);
    return next.handle(request);
  }
}

export const API_INTERCEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ApiInterceptor,
  multi: true
};

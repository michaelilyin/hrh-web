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
import {first, switchMap} from 'rxjs/operators';

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
    if (request.url.startsWith('/v1') || request.url.startsWith('v1')) {
      return this.environmentService.environment$.pipe(
        first(),
        switchMap(env => {
          return next.handle(request.clone({
            url: concatUrl(env.api, request.url)
          }));
        })
      );
    }
    if (this.request !== undefined && this.request !== null) {
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

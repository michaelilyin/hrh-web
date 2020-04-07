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

  private id = 0;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.warn('start request', ++this.id, request.url);
    if (request.url.startsWith('/v1') || request.url.startsWith('v1')) {
      return this.environmentService.environment$.pipe(
        first(),
        switchMap(env => {
          console.warn(this.id, env);
          const newUrl = concatUrl(`${this.protocol}${env.api}`, request.url);
          return next.handle(request.clone({
            url: newUrl
          })).pipe(
            tap(data => {
              switch (data.type) {
                case HttpEventType.Sent:
                  console.warn(this.id, 'sent');
                  break;
                case HttpEventType.Response:
                  console.warn(this.id, data.body);
                  break;
              }
            }),
            finalize(() => console.warn('complete request', this.id))
          );
        })
      );
    }
    console.warn('render', this.id, request.url);
    if (this.request !== undefined && this.request !== null) {
      const host = `${this.protocol}${this.request.get('host')}`;
      const newUrl = concatUrl(host, request.url);

      console.warn('handle render', this.id, newUrl);
      return next.handle(request.clone({url: newUrl}))
      .pipe(finalize(() => console.warn('complete request', this.id)));
    }

    console.warn('handle default', this.id, request.url);
    return next.handle(request).pipe(finalize(() => console.warn('complete request', this.id)));
  }

  get protocol(): string {
    if (this.request !== undefined && this.request !== null) {
      return `${this.request.protocol}://`;
    }
    return `${window.location.protocol}://`;
  }
}

export const API_INTERCEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ApiInterceptor,
  multi: true
};

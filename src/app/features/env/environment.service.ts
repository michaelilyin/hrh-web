import { APP_INITIALIZER, Injectable, isDevMode, Provider } from '@angular/core';
import { of, ReplaySubject } from 'rxjs';
import { Environment, OfflineEnvironment, OnlineEnvironment } from './environment.model';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@angular/cdk/platform';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private readonly environment = new ReplaySubject<Environment>(1);

  readonly environment$ = this.environment.asObservable();

  constructor(private readonly http: HttpClient, private readonly platform: Platform) {}

  init(): Promise<Environment> {
    return this.http
      .get<OnlineEnvironment>('/environment')
      .pipe(
        map((env) => {
          if (isDevMode()) {
            return {
              ...env,
              api: '',
              auth: {
                ...env.auth,
                loginRedirectHost: window.location.origin
              }
            };
          }
          return env;
        }),
        catchError(() => {
          return of({
            online: false
          } as OfflineEnvironment);
        }),
        tap((result) => {
          this.environment.next(result);
        })
      )
      .toPromise();
  }
}

export function initializeEnvironment(service: EnvironmentService): () => Promise<Environment> {
  return () => service.init();
}

export const ENVIRONMENT_INITIALIZER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializeEnvironment,
  multi: true,
  deps: [EnvironmentService]
};

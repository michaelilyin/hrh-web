import { APP_INITIALIZER, Injectable, isDevMode, Provider } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Environment } from './environment.model';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@angular/cdk/platform';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private readonly environment = new ReplaySubject<Environment>(1);

  readonly environment$ = this.environment.asObservable();

  constructor(private readonly http: HttpClient, private readonly platform: Platform) {}

  init(): Promise<Environment> {
    return this.http
      .get<Environment>('/environment')
      .pipe(
        tap((result) => {
          if (isDevMode()) {
            this.environment.next({
              ...result,
              auth: {
                ...result.auth,
                clientId: 'hrh-web-dev',
                loginRedirectHost: window.location.origin
              }
            });
            return;
          }
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

import { APP_INITIALIZER, Injectable, isDevMode, Provider } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Environment } from '../models/environment.model';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@angular/cdk/platform';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private readonly environment = new ReplaySubject<Environment>(1);

  readonly environment$ = this.environment.asObservable();

  constructor(private readonly http: HttpClient, private readonly platform: Platform) {}

  reload(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (isDevMode() && this.platform.isBrowser) {
        this.environment.next({
          api: `${window.location.protocol}//${window.location.host}`,
          // TODO: proxy all to cloud for config
          auth: {
            host: 'auth.michaelilyin.ru',
            path: 'https://auth.michaelilyin.ru/auth/realms/kiss-cloud',
            loginRedirect: window.location.origin
          }
        });
        resolve();
        return;
      }
      this.http.get<Environment>('/environment').subscribe(
        (result) => {
          this.environment.next(result);
          resolve();
        },
        (error) => reject(error)
      );
    });
  }
}

export function initializeEnvironment(service: EnvironmentService): () => Promise<void> {
  return () => service.reload();
}

export const ENVIRONMENT_INITIALIZER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializeEnvironment,
  multi: true,
  deps: [EnvironmentService]
};

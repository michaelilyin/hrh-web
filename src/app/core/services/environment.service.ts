import {APP_INITIALIZER, Inject, Injectable, isDevMode, PLATFORM_ID, Provider} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {Environment} from '../models/environment.model';
import {HttpClient} from '@angular/common/http';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  private readonly environment = new ReplaySubject<Environment>(1);

  readonly environment$ = this.environment.asObservable();

  constructor(
    private readonly http: HttpClient,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {
  }

  reload(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (isDevMode() && isPlatformBrowser(this.platformId)) {
        this.environment.next({
          api: `${window.location.protocol}//${window.location.host}`
        });
        resolve();
        return;
      }
      this.http.get<Environment>('/environment').subscribe(
        result => {
          this.environment.next(result);
          resolve();
        },
        error => reject(error)
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

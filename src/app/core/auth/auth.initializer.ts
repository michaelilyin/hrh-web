import { APP_INITIALIZER, Provider } from '@angular/core';
import { EnvironmentService } from '../environment/environment.service';
import { first, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

export function authInitializer(envService: EnvironmentService, authService: AuthService): () => Promise<void> {
  return () => {
    return envService.environment$
      .pipe(
        first(),
        switchMap((env) => authService.init(env))
      )
      .toPromise();
  };
}

export const AUTH_INITIALIZER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: authInitializer,
  multi: true,
  deps: [EnvironmentService, AuthService]
};

import {APP_INITIALIZER, Injectable, Provider} from '@angular/core';
import {ReplaySubject} from "rxjs";
import {Environment} from "../models/environment.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  private readonly _environment = new ReplaySubject<Environment>(1);

  readonly environment = this._environment.asObservable();

  constructor(private readonly http: HttpClient) {
  }

  reload(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get<Environment>('/environment').subscribe(
        result => {
          this._environment.next(result);
          resolve();
        },
        error => reject(error)
      )
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

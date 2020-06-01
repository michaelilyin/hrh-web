import { Observable } from 'rxjs';

export interface DSControlDSSide<S> {
  request$: Observable<S>;
  setState(state: S): void;
}

export interface DSControlUserSide<S> {
  readonly state$: Observable<S>;

  requestState(state: Partial<S>): void;
}

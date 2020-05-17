import { Observable, ReplaySubject } from 'rxjs';
import { Loader } from '@hrh/sdk/layout/loader/loader.component';

export abstract class DataSource<T> {
  abstract readonly paginator: Paginator;
  abstract readonly sorter: Sorter;
  abstract readonly querying$: Observable<boolean>;
}

export interface DSControlDSSide<S> {
  request$: Observable<S>;
  setState(state: S): void;
}

export interface DSControlUserSide<S> {
  readonly state$: Observable<S>;

  requestState(state: Partial<S>): void;
}

export interface PaginationState {
  limit: number;
  offset: number;
  total: number;
}

export abstract class Paginator implements DSControlUserSide<PaginationState> {
  abstract state$: Observable<PaginationState>;

  abstract requestState(page: Partial<PaginationState>): void;
}

export interface FieldSort {
  name: string;
  direction: 'asc' | 'desc';
}

export interface SortState {
  fields: ReadonlyArray<FieldSort>;
}

export abstract class Sorter implements DSControlUserSide<SortState> {
  abstract state$: Observable<SortState>;

  abstract requestState(sort: Partial<SortState>): void;
}

import { Observable } from 'rxjs';
import { Loader } from '@hrh/sdk/layout/loader/loader.component';

export abstract class DataSource<T> {
  abstract readonly paginator: Paginator;
  abstract readonly querying$: Observable<boolean>;
}

export interface PaginationState {
  limit: number;
  offset: number;
  total: number;
}

export abstract class Paginator {
  abstract state$: Observable<PaginationState>;

  abstract requestState(page: PaginationState): void;
}

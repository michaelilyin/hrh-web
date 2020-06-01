import { Observable } from 'rxjs';
import { DSControlUserSide } from '@hrh/sdk/data/commons/services.model';

export interface PaginationState {
  limit: number;
  offset: number;
  total: number;
}

export abstract class Paginator implements DSControlUserSide<PaginationState> {
  abstract state$: Observable<PaginationState>;

  abstract requestState(page: Partial<PaginationState>): void;
}

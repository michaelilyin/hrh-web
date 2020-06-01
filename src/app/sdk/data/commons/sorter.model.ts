import { Observable } from 'rxjs';
import { DSControlUserSide } from '@hrh/sdk/data/commons/services.model';

export interface SortField {
  name: string;
  direction: 'asc' | 'desc' | undefined;
}

export interface SortState {
  fields: ReadonlyArray<SortField>;
}

export abstract class Sorter implements DSControlUserSide<SortState> {
  abstract state$: Observable<SortState>;

  abstract requestState(sort: Partial<SortState>): void;
}

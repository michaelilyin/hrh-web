import { Observable } from 'rxjs';
import { DSControlUserSide } from '@hrh/sdk/data/commons/services.model';

export type FilterType = 'text' | 'date' | 'datetime' | 'number';

export interface FilterField<T> {
  value: T;
  type: FilterType;
}

export interface FilterFields {
  [p: string]: FilterField<unknown>;
}

export interface FilterState<F extends FilterFields> {
  fields: F;
}

export abstract class Filter implements DSControlUserSide<FilterState<FilterFields>> {
  abstract state$: Observable<FilterState<FilterFields>>;

  abstract requestState(filter: Partial<FilterState<FilterFields>>): void;
}

import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { DSControlDSSide } from '@hrh/sdk/data/commons/services.model';
import { Filter, FilterFields, FilterState } from '@hrh/sdk/data/commons/filter.model';

@Injectable()
export class FilterService extends Filter implements DSControlDSSide<FilterState<FilterFields>>, OnDestroy {
  state$ = new BehaviorSubject<FilterState<FilterFields>>({
    fields: {}
  });

  request$ = new BehaviorSubject<FilterState<FilterFields>>({
    fields: {}
  });

  constructor() {
    super();
  }

  requestState(filter: FilterState<FilterFields>): void {
    this.request$.next({
      ...this.request$.value,
      ...filter,
      fields: {
        ...this.request$.value.fields,
        ...filter.fields
      }
    });
  }

  setState(filter: FilterState<FilterFields>): void {
    this.state$.next(filter);
  }

  ngOnDestroy(): void {
    this.state$.complete();
    this.request$.complete();
  }
}

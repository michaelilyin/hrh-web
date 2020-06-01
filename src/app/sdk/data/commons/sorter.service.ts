import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { DSControlDSSide } from '@hrh/sdk/data/commons/services.model';
import { Sorter, SortState } from '@hrh/sdk/data/commons/sorter.model';

@Injectable()
export class SorterService extends Sorter implements DSControlDSSide<SortState>, OnDestroy {
  request$ = new BehaviorSubject<SortState>({
    fields: []
  });

  state$ = new BehaviorSubject<SortState>({
    fields: []
  });

  constructor() {
    super();
  }

  requestState(state: SortState): void {
    this.request$.next({
      ...this.request$.value,
      ...state
    });
  }

  setState(state: SortState): void {
    this.state$.next(state);
  }

  ngOnDestroy(): void {
    this.state$.complete();
    this.request$.complete();
  }
}

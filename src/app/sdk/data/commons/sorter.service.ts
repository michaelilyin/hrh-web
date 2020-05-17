import { Injectable, OnDestroy } from '@angular/core';
import { Sorter, SortState } from '@hrh/sdk/data/commons/ds.model';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable()
export class SorterService extends Sorter implements OnDestroy {
  request$ = new BehaviorSubject<SortState>({
    fields: []
  });

  state$ = new ReplaySubject<SortState>(1);

  requestState(state: SortState): void {
    this.request$.next({
      ...this.request$.value,
      ...state
    });
  }

  setState(state: SortState): void {
    this.state$.next(state);
  }

  constructor() {
    super();
  }

  ngOnDestroy(): void {
    this.state$.complete();
    this.request$.complete();
  }
}

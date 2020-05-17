import { Injectable, OnDestroy } from '@angular/core';
import { PaginationState, Paginator } from '@hrh/sdk/data/commons/ds.model';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable()
export class PaginatorService extends Paginator implements OnDestroy {
  state$ = new ReplaySubject<PaginationState>(1);

  request$ = new BehaviorSubject<PaginationState>({
    offset: 0,
    limit: Number.POSITIVE_INFINITY,
    total: 0
  });

  requestState(page: PaginationState): void {
    this.request$.next({
      ...this.request$.value,
      ...page
    });
  }

  setState(page: PaginationState): void {
    this.state$.next(page);
  }

  constructor() {
    super();
  }

  ngOnDestroy(): void {
    this.state$.complete();
    this.request$.complete();
  }
}

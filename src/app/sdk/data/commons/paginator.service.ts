import { Injectable, OnDestroy } from '@angular/core';
import { PaginationState, Paginator } from '@hrh/sdk/data/commons/ds.model';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class PaginatorService extends Paginator implements OnDestroy {
  state$ = new ReplaySubject<PaginationState>(1);

  request$ = new ReplaySubject<PaginationState>(1);

  requestState(page: PaginationState): void {
    this.request$.next(page);
  }

  setState(page: PaginationState): void {
    this.state$.next(page);
  }

  constructor() {
    super();
    this.request$.next({
      offset: 0,
      limit: Number.POSITIVE_INFINITY,
      total: 0
    });
  }

  ngOnDestroy(): void {
    this.state$.complete();
    this.request$.complete();
  }
}

import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { PaginationState, Paginator } from '@hrh/sdk/data/commons/pagination/paginator.model';
import { DSControlDSSide } from '@hrh/sdk/data/commons/services.model';

@Injectable()
export class PaginatorService extends Paginator implements DSControlDSSide<PaginationState>, OnDestroy {
  state$ = new BehaviorSubject<PaginationState>({
    offset: 0,
    limit: 25,
    total: 0
  });

  request$ = new BehaviorSubject<PaginationState>({
    offset: 0,
    limit: 25,
    total: 0
  });

  constructor() {
    super();
  }

  requestState(page: PaginationState): void {
    const current = this.state$.value;
    if (current.limit === page.limit && current.offset === page.offset) {
      return;
    }

    this.request$.next({
      ...current,
      ...page
    });
  }

  setState(page: PaginationState): void {
    this.state$.next(page);
  }

  ngOnDestroy(): void {
    this.state$.complete();
    this.request$.complete();
  }
}

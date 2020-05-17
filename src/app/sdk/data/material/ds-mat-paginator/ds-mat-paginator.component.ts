import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit
} from '@angular/core';
import { DataSource, PaginationState, Paginator } from '@hrh/sdk/data/commons/ds.model';
import { PageEvent } from '@angular/material/paginator';
import { Changes } from '@hrh/sdk/angular/changes/changes.model';
import { Observable, Subscription } from 'rxjs';
import { Loader } from '@hrh/sdk/layout/loader/loader.component';

@Component({
  selector: 'hrh-ds-mat-paginator',
  templateUrl: './ds-mat-paginator.component.html',
  styleUrls: ['./ds-mat-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsMatPaginatorComponent implements OnInit, OnChanges, OnDestroy {
  @Input() paginatorFor?: DataSource<unknown>;

  readonly PAGE_SIZE_OPTIONS: ReadonlyArray<number> = [25];

  paginator?: Paginator;
  loader?: Loader;
  state?: PaginationState;

  querying$?: Observable<boolean>;

  private pageSub = Subscription.EMPTY;

  constructor(private readonly cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngOnChanges(changes: Changes<this>): void {
    if (changes.paginatorFor != undefined) {
      this.setNewDataSource(changes.paginatorFor.currentValue);
      if (this.paginator != undefined) {
        this.paginator.requestState({
          offset: this.state?.offset ?? 0,
          limit: this.state?.limit ?? this.PAGE_SIZE_OPTIONS[0]
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.pageSub.unsubscribe();
  }

  get pageIndex(): number {
    if (this.state == undefined) {
      return 0;
    }
    return this.state.offset / this.state.limit;
  }

  get pageSize(): number {
    if (this.state == undefined) {
      return 0;
    }
    return this.state.limit;
  }

  get totalItems(): number {
    if (this.state == undefined) {
      return 0;
    }
    return this.state.total;
  }

  handlePageChange(event: PageEvent) {
    const limit = event.pageSize;
    const offset = event.pageIndex * limit;

    if (limit === this.state?.limit && offset === this.state?.offset) {
      return;
    }

    this.paginator?.requestState({
      limit,
      offset
    });
  }

  private setNewDataSource(dataSource: DataSource<unknown> | undefined) {
    this.querying$ = dataSource?.querying$;
    this.paginator = dataSource?.paginator;
    this.pageSub.unsubscribe();
    this.pageSub =
      this.paginator?.state$.subscribe((state) => {
        this.state = state;
        this.cd.markForCheck();
      }) ?? Subscription.EMPTY;
  }
}

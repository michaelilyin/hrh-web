import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
  Input,
  OnChanges
} from '@angular/core';
import { BreakpointService } from '@hrh/sdk/layout/adaptivity/breakpoint.service';
import { BreakpointName } from '@hrh/sdk/layout/adaptivity/breakpoint.model';
import { Observable, of, Subscription } from 'rxjs';
import { DataSource } from '@hrh/sdk/data/commons/ds.model';
import { Changes } from '@hrh/sdk/angular/changes/changes.model';
import { PaginationState, Paginator } from '@hrh/sdk/data/commons/pagination/paginator.model';
import { Loader } from '@hrh/sdk/layout/loader/loader.component';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { WrappedResponse } from '@hrh/sdk/data/model/data-request.model';

function calcNewResponse(previous: WrappedResponse<unknown> | undefined, response: WrappedResponse<unknown>) {
  if (previous == undefined) {
    return response;
  }

  const next = previous.request.page.offset < response.request.page.offset;
  const prev = previous.request.page.offset > response.request.page.offset;

  if (next) {
    return {
      ...response,
      response: {
        ...response.response,
        items: [...previous.response.items, ...response.response.items]
      }
    };
  }
  if (prev) {
    return {
      ...response,
      response: {
        ...response.response,
        items: [...response.response.items, ...previous.response.items]
      }
    };
  }

  return response;
}

@Component({
  selector: 'hrh-load-more-fixture',
  templateUrl: './load-more-fixture.component.html',
  styleUrls: ['./load-more-fixture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadMoreFixtureComponent implements OnInit, OnChanges, OnDestroy {
  @Input() paginatorFor?: DataSource<unknown>;

  private _active = false;

  paginator?: Paginator;
  state?: PaginationState;
  loader?: Loader;
  private ds?: DataSource<unknown>;

  querying$?: Observable<boolean>;

  private bpSub = Subscription.EMPTY;
  private pageSub = Subscription.EMPTY;

  private previous?: WrappedResponse<unknown>;
  private current?: WrappedResponse<unknown>;

  constructor(private readonly breakpointService: BreakpointService, private readonly cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.bpSub = this.breakpointService.current$
      .pipe(
        map((bp) => bp.has(BreakpointName.Handset, BreakpointName.TabletPortrait)),
        distinctUntilChanged()
      )
      .subscribe((active) => {
        this._active = active;
        if (this._active) {
          this.registerPostProcessor();
        } else {
          this.unregisterPostProcessor();
        }
        this.cd.markForCheck();
      });
  }

  ngOnChanges(changes: Changes<this>): void {
    if (changes.paginatorFor != undefined) {
      this.setNewDataSource(changes.paginatorFor.currentValue);
      if (this.paginator != undefined) {
        this.paginator.requestState({
          offset: this.state?.offset ?? 0,
          limit: this.state?.limit ?? 25
        });
      }
    }
  }

  ngOnDestroy(): void {
    if (this._active) {
      this.unregisterPostProcessor();
    }

    this.bpSub.unsubscribe();
    this.pageSub.unsubscribe();
  }

  get active(): boolean {
    return this._active;
  }

  handleLoadPrevClick() {
    const limit = this.state?.limit ?? 25;
    const offset = (this.state?.offset ?? 0) - limit;
    if (this.paginator != undefined) {
      this.paginator.requestState({
        offset: offset < 0 ? 0 : offset,
        limit
      });
    }
  }

  handleLoadMoreClick() {
    const limit = this.state?.limit ?? 25;
    const offset = (this.state?.offset ?? 0) + limit;
    if (this.paginator != undefined) {
      this.paginator.requestState({
        offset: (this.state?.offset ?? 0) > (this.state?.total ?? 0) ? this.state?.offset : offset,
        limit
      });
    }
  }

  private setNewDataSource(dataSource: DataSource<unknown> | undefined) {
    if (this._active) {
      this.unregisterPostProcessor();
    }
    this.ds = dataSource;
    this.querying$ = dataSource?.querying$;
    this.paginator = dataSource?.paginator;
    this.pageSub.unsubscribe();
    this.pageSub =
      this.paginator?.state$.subscribe((state) => {
        this.state = state;
        this.cd.markForCheck();
      }) ?? Subscription.EMPTY;
    if (this._active) {
      this.registerPostProcessor();
    }
  }

  unregisterPostProcessor() {
    this.previous = undefined;
    this.current = undefined;
    this.ds?.unregisterPostProcessor('load-more');
  }

  registerPostProcessor() {
    this.previous = undefined;
    this.current = undefined;
    this.ds?.registerPostProcessor('load-more', {
      postProcess: (response) => {
        const previous = this.previous;
        this.previous = response;

        this.current = calcNewResponse(previous, response);
        return this.current;
      }
    });
  }

  get total(): number {
    return this.state?.total ?? 0;
  }

  get displayed(): number {
    return this.current?.response.items.length ?? 0;
  }

  get skipped(): number {
    return this.state?.offset ?? 0;
  }

  get hasMore(): boolean {
    return this.skipped + this.displayed < this.total;
  }
}

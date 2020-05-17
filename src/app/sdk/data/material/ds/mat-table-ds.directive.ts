import { ChangeDetectorRef, Directive, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { DataSource as MatDataSource } from '@angular/cdk/table';
import { BehaviorSubject, combineLatest, Observable, of, ReplaySubject, Subscription } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import { DataRequest, DataResponse, FetchFn } from '@hrh/sdk/data/model/data-request.model';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { spy } from '@hrh/sdk/observable/spy.operator';
import { Loader } from '@hrh/sdk/layout/loader/loader.component';
import { DataSource } from '@hrh/sdk/data/commons/ds.model';
import { PaginatorService } from '@hrh/sdk/data/commons/paginator.service';
import { Change, Changes } from '@hrh/sdk/angular/changes/changes.model';

export class EmptyLoader extends Loader {
  constructor() {
    super();
  }
}

export interface WrappedResponse<T> {
  request: DataRequest;
  response: DataResponse<T>;
}

function defaultResponse<T>(_: DataRequest): Observable<DataResponse<T>> {
  return of({
    items: [],
    total: 0
  });
}

@Directive({
  selector: '[hrhMatTableDs]',
  exportAs: 'ds',
  providers: [PaginatorService]
})
export class MatTableDsDirective<T> extends DataSource<T> implements MatDataSource<T>, OnInit, OnChanges, OnDestroy {
  @Input('hrhMatTableDs') fetch: FetchFn<T> = defaultResponse;
  @Input() loader: Loader = new EmptyLoader();

  readonly querying$ = new BehaviorSubject<boolean>(false);

  private _data = new ReplaySubject<ReadonlyArray<T>>(1);

  private _viewer?: CollectionViewer;
  private _viewerSub = Subscription.EMPTY;

  private lockedSub = Subscription.EMPTY;

  constructor(
    private readonly matTable: MatTable<T>,
    readonly paginator: PaginatorService,
    private readonly cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.matTable.dataSource = this;
  }

  ngOnChanges(changes: Changes<this>): void {
    if (changes.loader != undefined) {
      this.lockedSub.unsubscribe();
      this.lockedSub = this.loader.queries$.subscribe((locked) => this.querying$.next(locked));
    }
  }

  connect(collectionViewer: CollectionViewer): Observable<T[] | ReadonlyArray<T>> {
    if (this._viewer != undefined) {
      throw Error('Only one viewer allowed');
    }

    this._viewer = collectionViewer;
    this._viewerSub = combineLatest([this.paginator.request$, collectionViewer.viewChange])
      .pipe(
        spy('state hit'),
        debounceTime(200),
        spy('viewer'),
        switchMap(([page]) => {
          const request: DataRequest = {
            page
          };
          return this.loader.queryOn(this.fetch(request)).pipe(
            map((response) => {
              const wrapper: WrappedResponse<T> = {
                request,
                response
              };
              return wrapper;
            })
          );
        }),
        spy('data')
      )
      .subscribe((wrapper) => {
        this.paginator.setState({
          ...wrapper.request.page,
          total: wrapper.response.total
        });

        this._data.next(wrapper.response.items);
      });

    return this._data;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    if (collectionViewer === this._viewer) {
      this._viewer = undefined;
      this._viewerSub.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this._viewer = undefined;
    this._viewerSub.unsubscribe();

    this.lockedSub.unsubscribe();
    this.querying$.complete();

    this._data.complete();
  }
}

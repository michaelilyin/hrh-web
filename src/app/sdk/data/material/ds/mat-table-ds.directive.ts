import {
  ChangeDetectorRef,
  Directive,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Self
} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { DataSource as MatDataSource } from '@angular/cdk/table';
import { BehaviorSubject, combineLatest, Observable, of, ReplaySubject, Subscription } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import { DataRequest, DataResponse, FetchFn, WrappedResponse } from '@hrh/sdk/data/model/data-request.model';
import { debounceTime, first, map, share, skip, startWith, switchMap } from 'rxjs/operators';
import { spy } from '@hrh/sdk/observable/spy.operator';
import { Loader } from '@hrh/sdk/layout/loader/loader.component';
import { DataSource } from '@hrh/sdk/data/commons/ds.model';
import { PaginatorService } from '@hrh/sdk/data/commons/pagination/paginator.service';
import { Changes } from '@hrh/sdk/angular/changes/changes.model';
import { SorterService } from '@hrh/sdk/data/commons/sorter.service';
import { FilterService } from '@hrh/sdk/data/commons/filter.service';
import { InMemoryStore, Store } from '@hrh/sdk/data/store/store.model';
import { filterDefined } from '@hrh/sdk/observable/filter-defined.operator';
import { DataSourcePostProcessor } from '@hrh/sdk/data/commons/post-processing/post-processor.model';

export class EmptyLoader extends Loader {
  constructor() {
    super();
  }
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
  providers: [
    PaginatorService,
    SorterService,
    FilterService,
    {
      provide: DataSource,
      useExisting: forwardRef(() => MatTableDsDirective)
    }
  ]
})
export class MatTableDsDirective<T> extends DataSource<T> implements MatDataSource<T>, OnInit, OnChanges, OnDestroy {
  @Input('hrhMatTableDs') fetch: FetchFn<T> = defaultResponse;
  @Input() loader: Loader = new EmptyLoader();

  readonly querying$ = new BehaviorSubject<boolean>(false);

  private _data = new ReplaySubject<ReadonlyArray<T>>(1);

  private readonly store: Store;
  private readonly postProcessors$ = new BehaviorSubject(new Map<string, DataSourcePostProcessor<T>>());

  private _viewer?: CollectionViewer;
  private _requestSub = Subscription.EMPTY;
  private _dataSub = Subscription.EMPTY;

  private lockedSub = Subscription.EMPTY;

  constructor(
    private readonly matTable: MatTable<T>,
    readonly paginator: PaginatorService,
    readonly sorter: SorterService,
    readonly filter: FilterService,
    private readonly cd: ChangeDetectorRef,
    @Optional() @Self() store?: Store
  ) {
    super();
    this.store = store ?? new InMemoryStore();
  }

  ngOnInit(): void {
    this.matTable.dataSource = this;
    this.refresh$.next();
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
    this.store.initialized$.pipe(first(), spy('initialize')).subscribe((saved) => {
      this.initialize(saved, collectionViewer);
    });

    return this._data;
  }

  private initialize(saved: DataRequest | undefined, collectionViewer: CollectionViewer) {
    this._requestSub = combineLatest([
      this.paginator.request$.pipe(spy('page')),
      this.sorter.request$.pipe(spy('sort')),
      this.filter.request$.pipe(spy('filter')),
      this.refresh$.pipe(spy('refresh')),
      collectionViewer.viewChange.pipe(spy('viewer'))
    ])
      .pipe(
        skip(saved == undefined ? 0 : 1),
        spy('state hit'),
        debounceTime(50),
        spy('viewer'),
        map(([page, sort, filter]) => {
          const request: DataRequest = {
            page,
            sort,
            filter
          };
          return request;
        })
      )
      .subscribe((request) => {
        this.store.saveRequest$.next(request);
      });

    const savedRequest$ = this.store.savedRequest$.pipe(
      startWith(saved),
      filterDefined(),
      spy('saved'),
      debounceTime(50)
    );
    const postProcessors$ = this.postProcessors$.pipe(
      debounceTime(50),
      map((postProcessors) => Array.from(postProcessors.values())),
      share()
    );

    this._dataSub = combineLatest([savedRequest$, postProcessors$])
      .pipe(
        switchMap(([request, postProcessors]) => {
          return this.loader.queryOn(this.fetch(request)).pipe(
            map((response) => {
              const wrapper: WrappedResponse<T> = {
                request,
                response
              };
              return wrapper;
            }),
            spy('data'),
            map((response) => {
              return postProcessors.reduce((acc: WrappedResponse<T>, next) => {
                return next.postProcess(acc);
              }, response);
            })
          );
        })
      )
      .subscribe((wrapper) => {
        this.paginator.setState({
          ...wrapper.request.page,
          total: wrapper.response.total
        });
        this.sorter.setState({
          ...wrapper.request.sort
        });
        this.filter.setState({
          ...wrapper.request.filter
        });

        this._data.next(wrapper.response.items);
      });
  }

  disconnect(collectionViewer: CollectionViewer): void {
    if (collectionViewer === this._viewer) {
      this._viewer = undefined;
      this._requestSub.unsubscribe();
      this._dataSub.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this._viewer = undefined;
    this._requestSub.unsubscribe();
    this._dataSub.unsubscribe();

    this.lockedSub.unsubscribe();
    this.querying$.complete();

    this._data.complete();
  }

  registerPostProcessor(name: string, postProcessor: DataSourcePostProcessor<T>): void {
    const processors = this.postProcessors$.value;
    processors.set(name, postProcessor);
    this.postProcessors$.next(processors);
  }

  unregisterPostProcessor(name: string): void {
    const processors = this.postProcessors$.value;
    processors.delete(name);
    this.postProcessors$.next(processors);
  }
}

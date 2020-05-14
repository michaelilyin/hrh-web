import { ChangeDetectorRef, Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatTreeFlatDataSource } from '@angular/material/tree';
import { DataSource } from '@angular/cdk/table';
import { EMPTY, Observable, of, ReplaySubject, Subscription } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import { DataRequest, DataResponse, FetchFn } from '@hrh/sdk/data/model/data-request.model';
import { switchMap } from 'rxjs/operators';
import { spy } from '@hrh/sdk/observable/spy.operator';
import { Loader, Progress } from '@hrh/sdk/layout/loader/loader.component';

export class EmptyProgress implements Progress {
  complete(): void {}
}

export class EmptyLoader extends Loader {
  locked$: Observable<boolean> = EMPTY;
  readonly locked: boolean = false;

  query(): Progress {
    return new EmptyProgress();
  }
  operation(): Progress {
    return new EmptyProgress();
  }

  queryOn<T>(o: Observable<T>): Observable<T> {
    return o;
  }
  operationOn<T>(o: Observable<T>): Observable<T> {
    return o;
  }
}

function defaultResponse<T>(req: DataRequest): Observable<DataResponse<T>> {
  return of({
    items: []
  });
}

@Directive({
  selector: '[hrhMatTableFlatDs]'
})
export class MatTableDsDirective<T> implements DataSource<T>, OnInit, OnDestroy {
  @Input('hrhMatTableFlatDs') fetch: FetchFn<T> = defaultResponse;
  @Input() loader: Loader = new EmptyLoader();

  private _data = new ReplaySubject<ReadonlyArray<T>>(1);

  private _viewer?: CollectionViewer;
  private _viewerSub = Subscription.EMPTY;

  constructor(private readonly matTable: MatTable<T>, private readonly cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.matTable.dataSource = this;
  }

  connect(collectionViewer: CollectionViewer): Observable<T[] | ReadonlyArray<T>> {
    if (this._viewer != undefined) {
      throw Error('Only one viewer allowed');
    }

    this._viewer = collectionViewer;
    this._viewerSub = collectionViewer.viewChange
      .pipe(
        spy('viewer'),
        switchMap(() => this.loader.queryOn(this.fetch({})))
      )
      .subscribe((response) => {
        this._data.next(response.items);
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
  }
}

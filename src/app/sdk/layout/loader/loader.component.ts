import { Component, OnInit, ChangeDetectionStrategy, forwardRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, ObservableInput, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, map, shareReplay, tap } from 'rxjs/operators';

export interface Progress {
  complete(): void;
}

export abstract class Loader {
  protected readonly _operations$ = new BehaviorSubject(0);
  protected readonly _queries$ = new BehaviorSubject(0);

  readonly operations$ = this._operations$.pipe(
    debounceTime(150),
    map((value) => value > 0),
    distinctUntilChanged(),
    shareReplay(1)
  );
  readonly queries$ = this._queries$.pipe(
    debounceTime(150),
    map((value) => value > 0),
    distinctUntilChanged(),
    shareReplay(1)
  );
  readonly locked$ = this._operations$.pipe(
    map((value) => value > 0),
    distinctUntilChanged(),
    shareReplay(1)
  );

  private _locked = false;

  get locked(): boolean {
    return this._locked;
  }

  query: () => Progress = () => {
    const count = this._queries$.value + 1;
    this._queries$.next(count);
    return {
      complete: () => {
        const completedCount = this._queries$.value - 1;
        this._queries$.next(completedCount);
      }
    };
  };

  operation: () => Progress = () => {
    const count = this._operations$.value + 1;
    this._locked = count > 0;
    this._operations$.next(count);
    return {
      complete: () => {
        const completedCount = this._operations$.value - 1;
        this._locked = count > 0;
        this._operations$.next(completedCount);
      }
    };
  };

  operationOn<T>(o: Observable<T>): Observable<T> {
    const lock = this.operation();
    return o.pipe(finalize(lock.complete));
  }

  queryOn<T>(o: Observable<T>): Observable<T> {
    const lock = this.query();
    return o.pipe(finalize(lock.complete));
  }
}

@Component({
  selector: 'hrh-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: Loader,
      useExisting: forwardRef(() => LoaderComponent)
    }
  ]
})
export class LoaderComponent extends Loader implements OnInit, OnDestroy {
  private lockedSub = Subscription.EMPTY;

  constructor(private readonly cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.lockedSub = this.locked$.subscribe(() => {
      this.cd.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.lockedSub.unsubscribe();
  }
}

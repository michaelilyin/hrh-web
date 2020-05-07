import { ID } from '@hrh/sdk/api/id.model';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { first, mapTo, shareReplay, takeUntil, tap } from 'rxjs/operators';
import { Injectable, Injector, OnDestroy } from '@angular/core';
import { HasId } from '@hrh/sdk/context/has-id.model';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NotificationsService } from '@hrh/sdk/notifications/_services/notifications.service';

export abstract class ContextService<T extends HasId> implements CanActivate, CanDeactivate<unknown>, OnDestroy {
  private readonly _context$ = new BehaviorSubject<T | undefined>(undefined);
  private readonly _destroyed$ = new ReplaySubject(1);

  readonly context$: Observable<T | undefined> = this._context$.pipe(shareReplay(1));

  private outdated = true;

  protected abstract readonly idKey: string;

  private readonly notificationsService: NotificationsService;

  protected constructor(protected readonly injector: Injector) {
    this.notificationsService = injector.get(NotificationsService);
  }

  markAsOutdated(): void {
    this.outdated = true;
  }

  refresh(idOrContext: ID | T): Observable<T | undefined> {
    if (typeof idOrContext === 'object') {
      this._context$.next(idOrContext);
      return this._context$.pipe(takeUntil(this._destroyed$), first());
    }

    return this.loadById(idOrContext).pipe(
      takeUntil(this._destroyed$),
      tap((context) => this._context$.next(context)),
      first()
    );
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();

    this._context$.complete();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = route.paramMap.get(this.idKey);

    if (id == undefined) {
      throw Error('Can not resolve by empty ID');
    }

    return this.refreshIfNeed(id).pipe(
      mapTo(true),
      this.notificationsService.catchError(() => of(false))
    );
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.clear();
    return true;
  }

  private refreshIfNeed(id: ID): Observable<T | undefined> {
    if (!this.outdated || this._context$.value?.id === id) {
      return this.context$.pipe(takeUntil(this._destroyed$), first());
    }

    return this.refresh(id);
  }

  private clear(): void {
    this._context$.next(undefined);
  }

  protected abstract loadById(id: ID): Observable<T>;
}

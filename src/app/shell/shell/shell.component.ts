import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TestHttpService } from './test-http.service';
import { BreakpointService } from '@hrh/sdk/layout/adaptivity/breakpoint.service';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { BreakpointName } from '@hrh/sdk/layout/adaptivity/breakpoint.model';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { MatDrawerMode } from '@angular/material/sidenav';
import { PwaService } from '@hrh/sdk/platform/pwa.service';
import { Platform } from '@angular/cdk/platform';
import { animate, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';

export enum MenuMode {
  Over,
  SideCollapsible,
  Side
}

@Component({
  selector: 'hrh-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [style({ width: 0, overflow: 'hidden' }), animate('150ms')]),
      transition(':leave', [style({ overflow: 'hidden' }), animate('150ms', style({ width: 0 }))])
    ])
  ]
})
export class ShellComponent implements OnInit {
  readonly test$ = this.testHttpService.getTest();

  readonly modes$ = this.breakpointService.current$.pipe(map((m) => Array.from(m.mode.values())));

  readonly updateAvailable$ = this.pwaService.updateAvailable$;

  readonly mode$ = this.breakpointService.current$.pipe(
    map((mode) => {
      if (mode.has(BreakpointName.HandsetPortrait, BreakpointName.TabletPortrait)) {
        return MenuMode.Over;
      }
      if (mode.has(BreakpointName.HandsetLandscape, BreakpointName.TabletLandscape, BreakpointName.WebPortrait)) {
        return MenuMode.SideCollapsible;
      }
      return MenuMode.Side;
    }),
    distinctUntilChanged(),
    shareReplay(1)
  );

  readonly drawerMode$: Observable<MatDrawerMode> = this.mode$.pipe(
    map((mode) => {
      if (mode === MenuMode.Over) {
        return 'over';
      }
      return 'side';
    }),
    distinctUntilChanged(),
    shareReplay(1)
  );

  readonly showMenuOpen$ = this.mode$.pipe(
    map((mode) => mode === MenuMode.Over),
    distinctUntilChanged(),
    shareReplay(1)
  );

  private readonly _menuOpened$ = new BehaviorSubject(false);

  readonly menuOpened$ = combineLatest([this.mode$, this._menuOpened$]).pipe(
    map(([mode, opened]) => {
      if (mode === MenuMode.Over) {
        return opened;
      }
      return true;
    }),
    distinctUntilChanged(),
    shareReplay(1)
  );

  private readonly _menuCollapsed$ = new BehaviorSubject(true);

  readonly menuCollapsed$ = combineLatest([this.mode$, this._menuCollapsed$]).pipe(
    map(([mode, collapsed]) => {
      if (mode === MenuMode.SideCollapsible) {
        return collapsed;
      }
      return false;
    }),
    distinctUntilChanged(),
    shareReplay(1)
  );

  readonly showMenuCollapse$ = combineLatest([this.mode$, this.menuCollapsed$]).pipe(
    map(([mode, collapsed]) => mode === MenuMode.SideCollapsible && !collapsed),
    distinctUntilChanged(),
    shareReplay(1)
  );

  readonly showMenuExpand$ = combineLatest([this.mode$, this.menuCollapsed$]).pipe(
    map(([mode, collapsed]) => mode === MenuMode.SideCollapsible && collapsed),
    distinctUntilChanged(),
    shareReplay(1)
  );

  constructor(
    private readonly testHttpService: TestHttpService,
    private readonly breakpointService: BreakpointService,
    private readonly pwaService: PwaService,
    private readonly platform: Platform,
    private readonly cd: ChangeDetectorRef,
    private readonly location: Location
  ) {}

  ngOnInit(): void {}

  get showBack(): boolean {
    return this.pwaService.pwa;
  }

  menuOpenChange(opened: boolean) {
    this._menuOpened$.next(opened);
  }

  menuCollapseChange(collapsed: boolean) {
    this._menuCollapsed$.next(collapsed);
  }

  handleRefresh() {
    if (this.platform.isBrowser) {
      window.location.reload();
    }
  }

  handleExpandCollapseDone() {
    // Run Change Detection for resize page content after expand/collapse
    this.cd.markForCheck();
  }

  back() {
    this.location.back();
  }
}

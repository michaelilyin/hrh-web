import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TestHttpService } from './test-http.service';
import { BreakpointService } from '@hrh/sdk/layout/adaptivity/breakpoint.service';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { BreakpointName } from '@hrh/sdk/layout/adaptivity/breakpoint.model';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { MatDrawerMode } from '@angular/material/sidenav';
import { spy } from '@hrh/sdk/observable/spy.operator';

enum MenuMode {
  Over,
  SideCollapsible,
  Side
}

@Component({
  selector: 'hrh-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent implements OnInit {
  readonly test$ = this.testHttpService.getTest();

  readonly modes$ = this.breakpointService.current$.pipe(map((m) => Array.from(m.mode.values())));

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
    private readonly breakpointService: BreakpointService
  ) {}

  ngOnInit(): void {}

  menuOpenChange(opened: boolean) {
    this._menuOpened$.next(opened);
  }

  menuCollapseChange(collapsed: boolean) {
    this._menuCollapsed$.next(collapsed);
  }
}
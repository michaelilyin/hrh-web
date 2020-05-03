import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import { CdkPortal, Portal, TemplatePortal } from '@angular/cdk/portal';
import { distinctUntilChanged, first, map, shareReplay, startWith } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { BreakpointName } from '@hrh/sdk/layout/adaptivity/breakpoint.model';
import { BreakpointService, CurrentViewportMode } from '@hrh/sdk/layout/adaptivity/breakpoint.service';
import { MatDrawerMode } from '@angular/material/sidenav';
import { SideMenuContext } from './side-menu.model';
import { SideMenuShellService } from './side-menu-shell.service';

export enum MenuMode {
  Over = 'Over',
  SideCollapsible = 'SideCollapsible',
  Side = 'Side'
}

function breakpointToMenu(mode: CurrentViewportMode): MenuMode {
  if (mode.has(BreakpointName.Handset, BreakpointName.TabletPortrait)) {
    return MenuMode.Over;
  }
  if (mode.has(BreakpointName.TabletLandscape, BreakpointName.WebPortrait)) {
    return MenuMode.SideCollapsible;
  }
  return MenuMode.Side;
}

function modeToDrawerMode(mode: MenuMode): MatDrawerMode {
  if (mode === MenuMode.Over) {
    return 'over';
  }
  return 'side';
}

function calcMenuState(mode: MenuMode, opened: boolean): boolean {
  if (mode === MenuMode.Over) {
    return opened;
  }
  return true;
}

function calcMenuExpandedState(mode: MenuMode, collapsed: boolean): boolean {
  if (mode === MenuMode.SideCollapsible) {
    return collapsed;
  }
  return true;
}

@Component({
  selector: 'hrh-side-menu-shell',
  templateUrl: './side-menu-shell.component.html',
  styleUrls: ['./side-menu-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SideMenuShellService]
})
export class SideMenuShellComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() menuButtonsPortal = new EventEmitter<CdkPortal>();

  @ViewChildren('toolbarButtons', { read: CdkPortal }) toolbarButtons!: QueryList<CdkPortal>;

  private toolbarButtonsSub = Subscription.EMPTY;

  readonly sideMenuPortals$ = this.sideMenuShellService.sideMenuPortals$;

  constructor(
    private readonly breakpointService: BreakpointService,
    private readonly sideMenuShellService: SideMenuShellService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  readonly mode$ = this.breakpointService.current$.pipe(
    map((mode) => breakpointToMenu(mode)),
    distinctUntilChanged(),
    shareReplay(1)
  );
  readonly drawerMode$: Observable<MatDrawerMode> = this.mode$.pipe(map((mode) => modeToDrawerMode(mode)));
  readonly showMenuOpen$ = this.mode$.pipe(map((mode) => mode === MenuMode.Over));
  readonly showMenuExpandCollapse$ = this.mode$.pipe(map((mode) => mode === MenuMode.SideCollapsible));

  private readonly _manualMenuOpenState$ = new BehaviorSubject<boolean>(false);
  readonly menuOpened$ = combineLatest([this.mode$, this._manualMenuOpenState$]).pipe(
    map(([mode, opened]) => calcMenuState(mode, opened)),
    distinctUntilChanged(),
    shareReplay(1)
  );

  private readonly _manualMenuExpandedState$ = new BehaviorSubject<boolean>(false);
  readonly menuExpanded$ = combineLatest([this.mode$, this._manualMenuExpandedState$]).pipe(
    map(([mode, collapsed]) => calcMenuExpandedState(mode, collapsed)),
    distinctUntilChanged(),
    shareReplay(1)
  );

  ngOnInit(): void {
    this.mode$.pipe(first()).subscribe((mode) => {
      this._manualMenuExpandedState$.next(mode !== MenuMode.SideCollapsible);
    });
  }

  ngAfterViewInit(): void {
    this.toolbarButtonsSub = this.toolbarButtons.changes
      .pipe(startWith(this.toolbarButtons))
      .subscribe((buttons: QueryList<CdkPortal>) => {
        this.menuButtonsPortal.emit(buttons.first);
      });
  }

  ngOnDestroy(): void {
    this.toolbarButtonsSub.unsubscribe();
  }

  toggleMenuOpen(value = !this._manualMenuOpenState$.value) {
    this._manualMenuOpenState$.next(value);
  }

  toggleExpandCollapse(expanded = !this._manualMenuExpandedState$.value) {
    this._manualMenuExpandedState$.next(expanded);
  }
}

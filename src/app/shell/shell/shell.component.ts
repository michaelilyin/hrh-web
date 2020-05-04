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
import { CdkPortal } from '@angular/cdk/portal';
import { NotificationsService } from '@hrh/sdk/notifications/_services/notifications.service';

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
  readonly updateAvailable$ = this.pwaService.updateAvailable$;

  menuButtons?: CdkPortal;

  constructor(
    private readonly testHttpService: TestHttpService,
    private readonly breakpointService: BreakpointService,
    private readonly pwaService: PwaService,
    private readonly platform: Platform,
    private readonly cd: ChangeDetectorRef,
    private readonly location: Location,
    private readonly notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {}

  get showBack(): boolean {
    return this.pwaService.pwa;
  }

  handleRefresh() {
    if (this.platform.isBrowser) {
      window.location.reload();
    }
  }

  back() {
    this.location.back();
  }
}

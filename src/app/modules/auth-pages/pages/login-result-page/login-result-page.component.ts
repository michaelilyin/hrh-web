import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { countdown } from '@hrh/sdk/observable/countdown';
import { AuthService } from '@hrh/auth/auth.service';
import { filter, first, switchMap } from 'rxjs/operators';
import { AUTH_DELAY } from '../../models/config.model';
import { PwaService } from '@hrh/sdk/platform/pwa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'hrh-login-result-page',
  templateUrl: './login-result-page.component.html',
  styleUrls: ['./login-result-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginResultPageComponent implements OnInit {
  readonly user$ = this.authService.auth$.pipe(filter((auth) => auth.authenticated));
  readonly countdown$ = this.user$.pipe(
    first(),
    switchMap(() => countdown(this.authDelay))
  );

  constructor(
    @Inject(AUTH_DELAY) private readonly authDelay: number,
    private readonly platform: Platform,
    private readonly authService: AuthService,
    private readonly pwaService: PwaService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const returnToApp = this.returnToApp;
    this.countdown$.subscribe({
      complete() {
        returnToApp();
      }
    });
  }

  handleReturnToApp() {
    this.returnToApp();
  }

  returnToApp = () => {
    if (this.pwaService.pwa) {
      this.router.navigate(['/']);
    }

    if (this.platform.isBrowser) {
      window.close();
    }
  };
}

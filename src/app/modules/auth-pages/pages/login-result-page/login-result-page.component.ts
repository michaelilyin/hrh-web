import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { countdown } from '../../../../sdk/observable/countdown';
import { AUTH_DELAY } from '@hrh/pages/auth-pages/models/config.model';
import { AuthService } from '../../../../features/auth/auth.service';
import { filter, first, switchMap } from 'rxjs/operators';

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
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    // noinspection UnnecessaryLocalVariableJS
    const platform = this.platform;
    this.countdown$.subscribe({
      complete() {
        if (platform.isBrowser) {
          window.close();
        }
      }
    });
  }

  handleReturnToApp() {
    if (this.platform.isBrowser) {
      window.close();
    }
  }
}

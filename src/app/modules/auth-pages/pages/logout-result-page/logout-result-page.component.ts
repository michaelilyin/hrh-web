import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { countdown } from '@hrh/sdk/observable/countdown';
import { AUTH_DELAY } from '../../models/config.model';

@Component({
  selector: 'hrh-logout-result-page',
  templateUrl: './logout-result-page.component.html',
  styleUrls: ['./logout-result-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutResultPageComponent implements OnInit {
  readonly countdown$ = countdown(this.authDelay);

  constructor(@Inject(AUTH_DELAY) private readonly authDelay: number, private readonly platform: Platform) {}

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

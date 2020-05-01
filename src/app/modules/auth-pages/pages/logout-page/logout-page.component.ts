import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Platform } from '@angular/cdk/platform';
import { PwaService } from '@hrh/sdk/platform/pwa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'hrh-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutPageComponent implements OnInit {
  constructor(
    private readonly oAuthService: OAuthService,
    private readonly platform: Platform,
    private readonly pwaService: PwaService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  handleLogoutClick() {
    this.oAuthService.logOut();
  }

  handleReturnClick() {
    if (this.pwaService.pwa || (this.platform.isBrowser && window.opener == undefined)) {
      this.router.navigate(['/'], {
        replaceUrl: true
      });
    }

    if (this.platform.isBrowser) {
      window.close();
    }
  }
}

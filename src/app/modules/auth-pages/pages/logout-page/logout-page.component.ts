import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'hrh-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutPageComponent implements OnInit {
  constructor(private readonly oAuthService: OAuthService, private readonly platform: Platform) {}

  ngOnInit(): void {}

  handleLogoutClick() {
    this.oAuthService.logOut();
  }

  handleReturnClick() {
    if (this.platform.isBrowser) {
      window.close();
    }
  }
}

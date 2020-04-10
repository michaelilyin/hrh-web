import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'hrh-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutPageComponent implements OnInit {
  constructor(private readonly oAuthService: OAuthService) {}

  ngOnInit(): void {
    this.oAuthService.loadDiscoveryDocument().then(() => this.oAuthService.logOut());
  }
}

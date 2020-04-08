import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TestHttpService} from './core/services/test-http.service';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'hrh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'hrh';

  readonly test$ = this.testHttpService.getTest();
  readonly test1$ = this.testHttpService.getTest1();

  constructor(public readonly testHttpService: TestHttpService,
              private readonly authService: OAuthService) {
  }

  login() {
    this.authService.initLoginFlow();
  }

  logout() {
    this.authService.logOut();
  }
}

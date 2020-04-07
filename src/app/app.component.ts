import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TestHttpService} from './core/services/test-http.service';
import {KeycloakService} from 'keycloak-angular';

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
              private readonly keycloakService: KeycloakService) {
  }

  login() {
    this.keycloakService.login().then(() => {})
  }

  logout() {
    this.keycloakService.logout().then(() => {})
  }
}

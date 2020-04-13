import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../features/auth/auth.service';
import { TestHttpService } from '@hrh/core/services/test-http.service';

@Component({
  selector: 'hrh-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent implements OnInit {
  readonly profile$ = this.authService.auth$;

  constructor(private readonly authService: AuthService, private readonly testHttpService: TestHttpService) {}

  ngOnInit(): void {}

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}

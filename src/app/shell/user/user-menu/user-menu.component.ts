import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@hrh/auth/auth.service';

@Component({
  selector: 'hrh-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent implements OnInit {
  readonly profile$ = this.authService.auth$;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}

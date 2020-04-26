import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@hrh/auth/auth.service';

@Component({
  selector: 'hrh-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent implements OnInit {
  user$ = this.authService.auth$;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {}
}

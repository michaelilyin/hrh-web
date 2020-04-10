import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'hrh-login-result-page',
  templateUrl: './login-result-page.component.html',
  styleUrls: ['./login-result-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginResultPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

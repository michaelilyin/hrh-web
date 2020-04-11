import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'hrh-login-result-page',
  templateUrl: './login-result-page.component.html',
  styleUrls: ['./login-result-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginResultPageComponent implements OnInit {
  constructor(private readonly platform: Platform) {}

  ngOnInit(): void {
    if (this.platform.isBrowser) {
      window.close();
    }
  }
}

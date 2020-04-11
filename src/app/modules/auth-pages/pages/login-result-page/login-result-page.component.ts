import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'hrh-login-result-page',
  templateUrl: './login-result-page.component.html',
  styleUrls: ['./login-result-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginResultPageComponent implements OnInit {
  constructor(private readonly platform: Platform, @Inject(DOCUMENT) private readonly document: Document) {}

  ngOnInit(): void {
    if (this.platform.isBrowser) {
      this.document.close();
    }
  }
}

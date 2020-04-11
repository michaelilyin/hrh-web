import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'hrh-logout-result-page',
  templateUrl: './logout-result-page.component.html',
  styleUrls: ['./logout-result-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutResultPageComponent implements OnInit {
  constructor(private readonly platform: Platform) {}

  ngOnInit(): void {
    if (this.platform.isBrowser) {
      window.close();
    }
  }
}

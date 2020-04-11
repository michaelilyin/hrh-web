import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'hrh-logout-result-page',
  templateUrl: './logout-result-page.component.html',
  styleUrls: ['./logout-result-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutResultPageComponent implements OnInit {
  constructor(private readonly platform: Platform, @Inject(DOCUMENT) private readonly document: Document) {}

  ngOnInit(): void {
    if (this.platform.isBrowser) {
      this.document.close();
    }
  }
}

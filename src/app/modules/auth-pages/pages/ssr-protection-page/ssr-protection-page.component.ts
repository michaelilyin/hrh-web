import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'hrh-ssr-protection',
  templateUrl: './ssr-protection-page.component.html',
  styleUrls: ['./ssr-protection-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SsrProtectionPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

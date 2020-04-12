import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'hrh-ssr-auth-notice',
  templateUrl: './ssr-auth-notice.component.html',
  styleUrls: ['./ssr-auth-notice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SsrAuthNoticeComponent implements OnInit {
  ngOnInit(): void {}
}

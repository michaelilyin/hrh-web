import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'hrh-logout-result-page',
  templateUrl: './logout-result-page.component.html',
  styleUrls: ['./logout-result-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutResultPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

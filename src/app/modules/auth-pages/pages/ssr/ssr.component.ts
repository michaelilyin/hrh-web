import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'hrh-ssr',
  templateUrl: './ssr.component.html',
  styleUrls: ['./ssr.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SsrComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

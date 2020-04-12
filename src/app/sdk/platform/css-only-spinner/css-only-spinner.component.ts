import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'hrh-css-only-spinner',
  templateUrl: './css-only-spinner.component.html',
  styleUrls: ['./css-only-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CssOnlySpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

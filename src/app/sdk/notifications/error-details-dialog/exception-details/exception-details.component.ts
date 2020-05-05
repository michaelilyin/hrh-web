import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hrh-exception-details',
  templateUrl: './exception-details.component.html',
  styleUrls: ['./exception-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExceptionDetailsComponent implements OnInit {
  @Input() error!: Error;

  constructor() {}

  ngOnInit(): void {}

  get message(): string {
    return this.error.message;
  }

  get stack(): string {
    return this.error.stack as string;
  }
}

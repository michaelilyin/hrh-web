import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hrh-generic-error-details',
  templateUrl: './generic-error-details.component.html',
  styleUrls: ['./generic-error-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericErrorDetailsComponent implements OnInit {
  @Input() error!: { message?: string };

  constructor() {}

  ngOnInit(): void {}

  get message(): string {
    if (this.error.message != undefined) {
      return this.error.message;
    }
    try {
      return JSON.stringify(this.error);
    } catch (e) {
      return this.error as string;
    }
  }
}

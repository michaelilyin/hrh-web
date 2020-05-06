import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '@hrh/sdk/notifications/_models/notification-component.model';

@Component({
  selector: 'hrh-http-error-details',
  templateUrl: './http-error-details.component.html',
  styleUrls: ['./http-error-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HttpErrorDetailsComponent implements OnInit {
  @Input() error!: HttpError;

  constructor() {}

  ngOnInit(): void {}

  get request(): string {
    const body = this.error.request?.body;
    if (body == undefined) {
      return '';
    }
    if (typeof body === 'string') {
      return body;
    }
    return JSON.stringify(body, undefined, '  ');
  }

  get response(): string {
    const error = this.error.response.error;
    if (error == undefined) {
      return '';
    }
    if (typeof error === 'string') {
      return error;
    }
    return JSON.stringify(error, undefined, '  ');
  }
}

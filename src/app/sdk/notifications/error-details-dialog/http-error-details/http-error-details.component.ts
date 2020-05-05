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
}

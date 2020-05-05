import { HttpErrorResponse, HttpRequest } from '@angular/common/http';

export class HttpError {
  constructor(readonly request: HttpRequest<unknown> | undefined, readonly response: HttpErrorResponse) {}
}

export type KnownError = HttpError | HttpErrorResponse | Error;

export interface TextNotificationInput {
  message: string;
}

export interface ErrorNotificationInput {
  error: KnownError;
}

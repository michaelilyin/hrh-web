export type KnownError = Error | string;

export interface TextNotificationInput {
  message: string;
}

export interface ErrorNotificationInput {
  error: KnownError;
}

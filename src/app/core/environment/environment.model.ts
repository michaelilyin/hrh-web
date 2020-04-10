export interface Environment {
  api: string;
  auth: {
    clientId: string;
    host: string;
    path: string;
    loginRedirectHost: string;
  };
}

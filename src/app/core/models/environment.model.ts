export interface Environment {
  api: string;
  auth: {
    host: string;
    path: string;
    loginRedirect: string;
  };
}

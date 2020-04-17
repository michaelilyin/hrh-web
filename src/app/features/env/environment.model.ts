export interface OfflineEnvironment {
  online: false;
}

export interface OnlineEnvironment {
  online: true;
  api: string;
  auth: {
    clientId: string;
    host: string;
    path: string;
    loginRedirectHost: string;
  };
}

export type Environment = OnlineEnvironment | OfflineEnvironment;

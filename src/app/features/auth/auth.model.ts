export interface UserAuthentication {
  authenticated: true;
  username: string;
  email: string;
  firstName: string;
  lastName?: string;
  roles: string[];
}

export interface AnonymousAuthentication {
  authenticated: false;
}

export type Authentication = UserAuthentication | AnonymousAuthentication;

export interface UserAuthentication {
  readonly authenticated: true;
  readonly username: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName?: string;
  readonly roles: ReadonlySet<string>;

  hasRole(role: string): boolean;
  hasRoleExcept(role: string, except: string): boolean;
  hasAnyRole(...role: string[]): boolean;
}

export interface AnonymousAuthentication {
  readonly authenticated: false;
}

export type Authentication = UserAuthentication | AnonymousAuthentication;

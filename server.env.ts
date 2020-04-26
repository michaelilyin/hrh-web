import { Environment } from '@hrh/env/environment.model';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (value === undefined || value === null || value.trim().length === 0) {
    throw Error(`${name} must be defined`);
  }
  return value;
}

export function env(): Environment {
  return {
    online: true,
    api: requireEnv('API'),
    auth: {
      clientId: requireEnv('AUTH_CLIENT_ID'),
      host: requireEnv('AUTH_HOST'),
      path: requireEnv('AUTH_PATH'),
      loginRedirectHost: requireEnv('AUTH_LOGIN_REDIRECT_HOST')
    }
  };
}

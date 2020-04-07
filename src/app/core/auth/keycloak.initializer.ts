import {APP_INITIALIZER, Provider} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';

export function keycloakInitializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => keycloak.init({
    config: {
      realm: 'kiss-cloud',
      url: 'https://auth.michaelilyin.ru/auth/',
      clientId: 'hrh-web-dev',
    },
    initOptions: {
      onLoad: 'check-sso'
    }
  });
}

export const KEYCLOAK_INITIALIZER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: keycloakInitializer,
  multi: true,
  deps: [KeycloakService]
};

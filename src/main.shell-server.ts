import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export { AppShellServerModule as AppServerModule } from './app/app.shell-server.module';
export { renderModule, renderModuleFactory } from '@angular/platform-server';

import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BasicLayoutModule } from '@hrh/layout/basic-layout.module';
import { MatCardModule } from '@angular/material/card';
import { SdkModule } from '@hrh/sdk/sdk.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [{ path: 'shell', component: AppShellComponent }];

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled'
    }),
    MatToolbarModule,
    BasicLayoutModule,
    MatCardModule,
    SdkModule,
    MatProgressSpinnerModule
  ],
  bootstrap: [AppComponent],
  declarations: [AppShellComponent]
})
export class AppServerModule {}

import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { SdkModule } from '@hrh/sdk/sdk.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShellSharedModule } from '@hrh/shell/shell-shared.module';

const routes: Routes = [{ path: 'shell', component: AppShellComponent }];

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatCardModule,
    SdkModule,
    MatProgressSpinnerModule,
    ShellSharedModule
  ],
  bootstrap: [AppComponent],
  declarations: [AppShellComponent]
})
export class AppServerModule {}

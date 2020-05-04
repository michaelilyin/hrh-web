import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell/shell.component';
import { ShellRoutingModule } from './shell-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { UserMenuComponent } from './user/user-menu/user-menu.component';
import { AuthModule } from '@hrh/auth/auth.module';
import { SdkModule } from '@hrh/sdk/sdk.module';
import { PersonsModule } from '@hrh/persons/persons.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgProgressModule } from 'ngx-progressbar';
import { ShellSharedModule } from '@hrh/shell/shell-shared.module';
import { PortalModule } from '@angular/cdk/portal';
import { SideMenuModule } from '@hrh/side-menu/side-menu.module';

@NgModule({
  declarations: [ShellComponent, UserMenuComponent],
  imports: [
    CommonModule,
    ShellRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    SdkModule,
    MatDividerModule,
    PersonsModule,
    ShellSharedModule,
    AuthModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    NgProgressModule,
    PortalModule,
    SideMenuModule
  ]
})
export class ShellModule {}

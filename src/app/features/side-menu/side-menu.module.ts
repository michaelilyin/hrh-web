import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuShellComponent } from './side-menu-shell/side-menu-shell.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SideMenuDefDirective } from './side-menu/side-menu-def.directive';
import { PortalModule } from '@angular/cdk/portal';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AuthModule } from '@hrh/auth/auth.module';
import { RouterModule } from '@angular/router';
import { MenuAutoCloseDirective } from './side-menu/menu-auto-close.directive';

@NgModule({
  declarations: [SideMenuShellComponent, SideMenuComponent, SideMenuDefDirective, MenuAutoCloseDirective],
  exports: [SideMenuShellComponent, SideMenuComponent, SideMenuDefDirective, MenuAutoCloseDirective],
  imports: [
    CommonModule,
    PortalModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    AuthModule,
    RouterModule
  ]
})
export class SideMenuModule {}

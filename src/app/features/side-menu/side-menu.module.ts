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
import { SidenavExpandedContentDirective } from './side-menu/sidenav-expanded-content.directive';
import { SidenavListDirective } from '@hrh/side-menu/side-menu/sidenav-list.directive';
import { SidenavItemDirective } from '@hrh/side-menu/side-menu/sidenav-item.directive';

@NgModule({
  declarations: [
    SideMenuShellComponent,
    SideMenuComponent,
    SideMenuDefDirective,
    SidenavListDirective,
    SidenavItemDirective,
    SidenavExpandedContentDirective
  ],
  exports: [
    SideMenuShellComponent,
    SideMenuComponent,
    SideMenuDefDirective,
    SidenavListDirective,
    SidenavItemDirective,
    SidenavExpandedContentDirective
  ],
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

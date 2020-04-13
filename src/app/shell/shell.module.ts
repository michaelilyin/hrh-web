import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell/shell.component';
import { ShellRoutingModule } from './shell-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SdkModule } from '../sdk/sdk.module';
import { MatDividerModule } from '@angular/material/divider';
import { PersonsModule } from '../features/persons/persons.module';
import { UserMenuComponent } from './user/user-menu/user-menu.component';
import { BasicLayoutModule } from '../features/basic-layout/basic-layout.module';
import { AuthModule } from '../features/auth/auth.module';

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
    BasicLayoutModule,
    AuthModule
  ]
})
export class ShellModule {}

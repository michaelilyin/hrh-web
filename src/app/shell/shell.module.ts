import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell/shell.component';
import { ShellRoutingModule } from './shell-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SdkModule } from '../sdk/sdk.module';
import { CoreModule } from '@hrh/core/core.module';
import { MatDividerModule } from '@angular/material/divider';
import { PersonsModule } from '../features/persons/persons.module';

@NgModule({
  declarations: [ShellComponent],
  imports: [
    CommonModule,
    ShellRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    SdkModule,
    CoreModule,
    MatDividerModule,
    PersonsModule
  ]
})
export class ShellModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyAuthenticatedDirective } from './only-authenticated.directive';

@NgModule({
  declarations: [OnlyAuthenticatedDirective],
  exports: [OnlyAuthenticatedDirective],
  imports: [CommonModule]
})
export class AuthModule {}

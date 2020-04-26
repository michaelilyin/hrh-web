import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilePagesRoutingModule } from './profile-pages-routing.module';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [CommonModule, ProfilePagesRoutingModule]
})
export class ProfilePagesModule {}
